"use client"

import { useState, useEffect, useRef } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { Camera, CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react"

export default function AdminScannerPage() {
  const [eventId, setEventId] = useState("1") // Default event ID
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{
    status: "success" | "error" | "warning" | null
    message: string
  }>({ status: null, message: "" })
  const [lastScanned, setLastScanned] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const scannerRef = useRef<Html5Qrcode | null>(null)

  // Play beep sound using Web Audio API
  const playBeep = (type: "success" | "error") => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)

      if (type === "success") {
        oscillator.type = "sine"
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1)
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3)
        oscillator.start(audioCtx.currentTime)
        oscillator.stop(audioCtx.currentTime + 0.3)
      } else {
        oscillator.type = "sawtooth"
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.3)
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4)
        oscillator.start(audioCtx.currentTime)
        oscillator.stop(audioCtx.currentTime + 0.4)
      }
    } catch (e) {
      console.error("Audio API not supported", e)
    }
  }

  const handleScanSuccess = async (decodedText: string) => {
    // Prevent double scanning immediately
    if (isProcessing || decodedText === lastScanned) {
      return
    }

    setIsProcessing(true)
    setLastScanned(decodedText)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiUrl}/api/events/${eventId}/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ qr_code: decodedText }),
      })

      const data = await response.json()

      if (response.ok) {
        playBeep("success")
        setScanResult({
          status: "success",
          message: data.message || "Berhasil Check-in!",
        })
      } else if (response.status === 400) {
        playBeep("error")
        setScanResult({
          status: "warning",
          message: data.message || "Tiket sudah digunakan sebelumnya.",
        })
      } else {
        playBeep("error")
        setScanResult({
          status: "error",
          message: data.message || "Tiket tidak valid atau tidak ditemukan.",
        })
      }
    } catch (error) {
      playBeep("error")
      setScanResult({
        status: "error",
        message: "Gagal terhubung ke server.",
      })
    } finally {
      setIsProcessing(false)
      // Reset last scanned after 3 seconds so the same QR can be theoretically scanned again if needed later
      setTimeout(() => {
        setLastScanned("")
      }, 3000)
    }
  }

  const startScanner = async () => {
    if (!eventId) {
      alert("Masukkan Event ID terlebih dahulu")
      return
    }

    setIsScanning(true)
    setScanResult({ status: null, message: "" })

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader")
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        handleScanSuccess,
        (errorMessage) => {
          // Ignore general scan errors (like no QR code in frame)
        }
      )
    } catch (err) {
      console.error("Failed to start scanner:", err)
      setScanResult({
        status: "error",
        message: "Kamera tidak dapat diakses. Pastikan Anda telah memberikan izin.",
      })
      setIsScanning(false)
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop()
      } catch (err) {
        console.error("Failed to stop scanner:", err)
      }
      setIsScanning(false)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-12 pb-20">
      <div className="container max-w-lg flex-1 flex flex-col">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">Scanner Kehadiran</h1>
          <p className="text-navy/60 text-sm">Scan QR Code tiket peserta untuk Check-in event</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <label className="block text-sm font-medium text-navy mb-1.5">Event ID</label>
            <input
              type="text"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              disabled={isScanning}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition text-navy disabled:bg-gray-100"
              placeholder="Masukkan ID Event"
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 bg-black/5 relative">
            {!isScanning ? (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Camera className="w-8 h-8" />
                </div>
                <p className="text-navy/60 font-medium mb-6">Kamera belum aktif</p>
                <button
                  onClick={startScanner}
                  className="bg-navy text-white px-8 py-3 rounded-xl font-semibold hover:bg-navy/90 transition-colors shadow-lg"
                >
                  Mulai Scan
                </button>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                <div id="reader" className="w-full overflow-hidden rounded-xl bg-black" style={{ minHeight: "300px" }}></div>
                <button
                  onClick={stopScanner}
                  className="mt-6 bg-red-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-lg mx-auto"
                >
                  Hentikan Scan
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-xl">
                <RefreshCw className="w-10 h-10 text-gold animate-spin mb-3" />
                <p className="font-semibold text-navy">Memproses Tiket...</p>
              </div>
            )}
          </div>

          {scanResult.status && (
            <div className={`p-6 border-t ${scanResult.status === "success" ? "bg-green-50 border-green-100" :
                scanResult.status === "warning" ? "bg-yellow-50 border-yellow-100" :
                  "bg-red-50 border-red-100"
              }`}>
              <div className="flex items-start">
                {scanResult.status === "success" ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                ) : scanResult.status === "warning" ? (
                  <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold text-lg ${scanResult.status === "success" ? "text-green-800" :
                      scanResult.status === "warning" ? "text-yellow-800" :
                        "text-red-800"
                    }`}>
                    {scanResult.status === "success" ? "Sukses!" :
                      scanResult.status === "warning" ? "Perhatian" :
                        "Gagal"}
                  </h4>
                  <p className={`mt-1 ${scanResult.status === "success" ? "text-green-700" :
                      scanResult.status === "warning" ? "text-yellow-700" :
                        "text-red-700"
                    }`}>
                    {scanResult.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
