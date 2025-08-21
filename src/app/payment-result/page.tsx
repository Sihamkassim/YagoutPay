'use client';

import '@/style/globals.css';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SuccessDisplay = () => (
  <>
    <svg className="w-16 h-16 mx-auto text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h1 className="text-3xl font-bold text-gray-800 mt-4">Yay! Payment Successful 🎀</h1>
    <p className="text-gray-600 mt-2">Thank you, lovely! Your transaction went through perfectly.</p>
  </>
);

const FailDisplay = () => (
  <>
    <svg className="w-16 h-16 mx-auto text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h1 className="text-3xl font-bold text-gray-800 mt-4">Oops! Payment Failed 😢</h1>
    <p className="text-gray-600 mt-2">Something didn’t work. Don’t worry, let’s try again!</p>
  </>
);

const ErrorDisplay = () => (
  <>
    <h1 className="text-3xl font-bold text-gray-800 mt-4">Hmm… Invalid Access</h1>
    <p className="text-gray-600 mt-2">This page can’t be accessed directly, sweetheart.</p>
  </>
);

export default function PaymentResultPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [details, setDetails] = useState<{ orderId?: string; txnId?: string; amount?: string; currency?: string; time?: string; message?: string; code?: string }>({});

  useEffect(() => {
    const urlStatus = searchParams.get('status');
    setStatus(urlStatus || 'error');
    setDetails({
      orderId: searchParams.get('orderId') || undefined,
      txnId: searchParams.get('txnId') || undefined,
      amount: searchParams.get('amount') || undefined,
      currency: searchParams.get('currency') || undefined,
      time: searchParams.get('time') || undefined,
      message: searchParams.get('message') || undefined,
      code: searchParams.get('code') || undefined,
    });
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-center p-4">
      <div className="bg-white p-10 rounded-2xl shadow-md max-w-xl w-full border border-pink-100">
        {status === 'success' && <SuccessDisplay />}
        {status === 'failed' && <FailDisplay />}
        {status === 'error' && <ErrorDisplay />}

        {(status === 'success' || status === 'failed') && (
          <div className="text-left mt-6 space-y-2 text-sm text-gray-700">
            {details.message && (
              <div>
                <span className="font-medium text-gray-900">Message:</span> {decodeURIComponent(details.message)}
              </div>
            )}
            {details.code && (
              <div>
                <span className="font-medium text-gray-900">Code:</span> {details.code}
              </div>
            )}
            {details.orderId && (
              <div>
                <span className="font-medium text-gray-900">Order #:</span> {details.orderId}
              </div>
            )}
            {details.txnId && (
              <div>
                <span className="font-medium text-gray-900">Transaction ID:</span> {details.txnId}
              </div>
            )}
            {(details.amount || details.currency) && (
              <div>
                <span className="font-medium text-gray-900">Amount:</span> {details.amount}
                {details.currency ? ` ${details.currency}` : ''}
              </div>
            )}
            {details.time && (
              <div>
                <span className="font-medium text-gray-900">Date & Time:</span> {details.time}
              </div>
            )}
          </div>
        )}
        <Link href="/checkout">
          <span className="inline-block mt-6 px-6 py-2 text-sm font-medium text-white bg-pink-500 rounded-full shadow-md hover:bg-pink-600 transition duration-200">
            {status === 'success' ? 'Make Another Payment ' : 'Try Again '}
          </span>
        </Link>
      </div>
    </div>
  );
}
