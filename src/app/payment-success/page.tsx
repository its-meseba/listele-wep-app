"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">Thank you for your purchase. Your plan has been updated.</p>
      <Link href="/dashboard">
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
} 