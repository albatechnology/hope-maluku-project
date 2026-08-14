"use client";

import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Toaster, toast } from "react-hot-toast";

export default function ScannerPage() {
  const [manualQr, setManualQr] = useState("");
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Scanner when component mounts
    scannerRef.current = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
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

    const onScanFailure = (error: string) => {
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
    const toastId = toast.loading("Checking in...");
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/events/check-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          // Add auth token if your API is protected
          // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ qr_code: qrCode }),
      });

      const data = await response.json();

      if (response.ok && data.status === 200) {
        toast.success(
          <div>
            <b>Success!</b>
            <br />
            {data.data.attendee_name} checked in.
            <br />
            <small>{data.data.event_name} (Ticket: {data.data.ticket_number})</small>
          </div>, 
          { id: toastId, duration: 4000 }
        );
      } else {
        toast.error(data.message || "Invalid Ticket / Check-in Failed", { id: toastId, duration: 4000 });
      }
    } catch (error) {
      console.error("Check-in Error:", error);
      toast.error("Network error. Please check your connection.", { id: toastId });
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQr.trim()) return;
    handleCheckIn(manualQr.trim());
    setManualQr("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Toaster position="bottom-center" />
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Event Scanner</h1>
          <p className="text-gray-500 mt-2">Scan QR code to check-in participant</p>
        </div>

        <div className="mb-8">
          <div 
            id="reader" 
            className="rounded-lg overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50"
            style={{ width: "100%", minHeight: "300px" }}
          ></div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Manual Check-in
          </h3>
          <form onSubmit={handleManualSubmit} className="flex gap-2">
            <input
              type="text"
              value={manualQr}
              onChange={(e) => setManualQr(e.target.value)}
              placeholder="Enter QR string manually..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Check In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
