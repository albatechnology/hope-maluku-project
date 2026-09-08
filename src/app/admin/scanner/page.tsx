"use client";

import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Toaster, toast } from "react-hot-toast";
import AdminAuthGuard, { useAdminAuth } from "@/components/admin/AdminAuthGuard";
import { getAdminToken, clearAdminSession } from "@/lib/adminAuth";
import { useRouter } from "next/navigation";
import { QrCode, CheckCircle2, AlertCircle, History, Camera, UserCheck } from "lucide-react";

interface RecentCheckIn {
  name: string;
  ticket: string;
  eventName: string;
  time: string;
}

function ScannerContent() {
  const router = useRouter();
  const { user } = useAdminAuth();
  const [manualQr, setManualQr] = useState("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [recentCheckIns, setRecentCheckIns] = useState<RecentCheckIn[]>([]);
  const [lastCheckedInAttendee, setLastCheckedInAttendee] = useState<RecentCheckIn | null>(null);

  // Sound feedback on success
  const playSuccessSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch {
      // AudioContext might be blocked until user gesture, ignore safely
    }
  };

  useEffect(() => {
    // Initialize Scanner when component mounts
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 260, height: 260 },
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: true,
      },
      false
    );

    const onScanSuccess = async (decodedText: string) => {
      // Prevent rapid scanning of the same code
      if (lastScanned === decodedText) return;

      setLastScanned(decodedText);
      await handleCheckIn(decodedText);

      // Allow scanning the same code again after 3 seconds if needed
      setTimeout(() => {
        setLastScanned(null);
      }, 3000);
    };

    const onScanFailure = () => {
      // Ignore background noise failures
    };

    scannerRef.current.render(onScanSuccess, onScanFailure);

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
    };
  }, [lastScanned]);

  const handleCheckIn = async (qrCode: string) => {
    const toastId = toast.loading("Memvalidasi tiket...");
    const token = getAdminToken();

    if (!token) {
      toast.error("Sesi tidak ditemukan. Silakan login kembali.", { id: toastId });
      router.replace("/admin/login");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/events/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ qr_code: qrCode }),
      });

      const data = await response.json();

      if (response.status === 401) {
        toast.error("Sesi admin telah berakhir. Silakan login kembali.", { id: toastId });
        clearAdminSession();
        router.replace("/admin/login?redirect=/admin/scanner");
        return;
      }

      if (response.status === 403) {
        toast.error(data.message || "Akses ditolak. Bukan akun admin.", { id: toastId });
        return;
      }

      if (response.ok && data.status === 200) {
        playSuccessSound();

        const newAttendee: RecentCheckIn = {
          name: data.data.attendee_name || "Peserta",
          ticket: data.data.ticket_number || qrCode,
          eventName: data.data.event_name || "Event",
          time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        };

        setLastCheckedInAttendee(newAttendee);
        setRecentCheckIns((prev) => [newAttendee, ...prev.slice(0, 4)]);

        toast.success(
          <div>
            <b className="text-emerald-700 font-bold">Check-In Berhasil!</b>
            <div className="mt-1 text-sm text-slate-800 font-medium">
              {data.data.attendee_name}
            </div>
            <div className="text-xs text-slate-500">
              {data.data.event_name} (Tiket: {data.data.ticket_number})
            </div>
          </div>,
          { id: toastId, duration: 4000 }
        );
      } else {
        toast.error(data.message || "Tiket tidak valid atau gagal check-in.", { id: toastId, duration: 4000 });
      }
    } catch (error) {
      console.error("Check-in Error:", error);
      toast.error("Gangguan jaringan. Pastikan koneksi dan server aktif.", { id: toastId });
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQr.trim()) return;
    handleCheckIn(manualQr.trim());
    setManualQr("");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Toaster position="top-center" />

      {/* Header Info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Camera className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900">Scanner Tiket Hari-H</h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Arahkan kamera ke QR code tiket atau masukkan kode tiket secara manual
          </p>
        </div>

        {user && (
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-slate-600">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>Petugas: <strong className="text-slate-800">{user.name}</strong></span>
          </div>
        )}
      </div>

      {/* Latest Success Card */}
      {lastCheckedInAttendee && (
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Check-in Terakhir
              </span>
              <span className="text-xs text-emerald-600 font-mono">
                {lastCheckedInAttendee.time}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5 truncate">
              {lastCheckedInAttendee.name}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              {lastCheckedInAttendee.eventName} &bull; <span className="font-mono text-slate-500">{lastCheckedInAttendee.ticket}</span>
            </p>
          </div>
        </div>
      )}

      {/* Scanner Box */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
        <div className="mb-6">
          <div 
            id="reader" 
            className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-white min-h-[300px]"
          ></div>
        </div>

        {/* Manual Input */}
        <div className="border-t border-slate-100 pt-5">
          <div className="flex items-center gap-1.5 mb-2.5">
            <QrCode className="w-4 h-4 text-slate-400" />
            <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Input Kode Tiket Manual
            </h3>
          </div>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualQr}
              onChange={(e) => setManualQr(e.target.value)}
              placeholder="Masukkan string QR atau nomor tiket..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-sm text-slate-800 transition-all"
            />
            <button 
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/20 transition-colors cursor-pointer"
            >
              Absen
            </button>
          </form>
        </div>
      </div>

      {/* Recent Activity List */}
      {recentCheckIns.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-3 text-slate-700 font-semibold text-sm">
            <History className="w-4 h-4 text-slate-400" />
            <span>Riwayat Sesi Ini ({recentCheckIns.length})</span>
          </div>
          <div className="divide-y divide-slate-100">
            {recentCheckIns.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="min-w-0 pr-3">
                  <p className="font-semibold text-slate-800 truncate">{item.name}</p>
                  <p className="text-slate-500 truncate font-mono">{item.ticket}</p>
                </div>
                <span className="text-slate-400 shrink-0 font-mono">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ScannerPage() {
  return (
    <AdminAuthGuard>
      <ScannerContent />
    </AdminAuthGuard>
  );
}
