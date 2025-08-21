'use client';
import '@/style/globals.css';
import { useState } from 'react';

export default function CheckoutPage() {
  const [form, setForm] = useState({
    cust_name: '',
    email_id: '',
    mobile_no: '',
    amount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount).toFixed(2),
    };

    const res = await fetch('/api/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API Error:', errorData.error);
      alert('Payment failed: ' + errorData.error);
      return;
    }

    const paymentData = await res.json();

    const paymentForm = document.createElement('form');
    paymentForm.method = 'POST';
    paymentForm.action = paymentData.url;
    paymentForm.style.display = 'none';

    const inputs = [
      { name: 'me_id', value: paymentData.me_id },
      { name: 'merchant_request', value: paymentData.merchant_request },
      { name: 'hash', value: paymentData.hash }
    ];

    inputs.forEach(input => {
      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = input.name;
      hiddenInput.value = input.value;
      paymentForm.appendChild(hiddenInput);
    });

    document.body.appendChild(paymentForm);
    paymentForm.submit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm border border-pink-100">
        <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600 tracking-wide">
          YAGOUT Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="cust_name" className="block text-sm font-medium text-pink-700">
              Full Name
            </label>
            <input
              type="text"
              name="cust_name"
              id="cust_name"
              value={form.cust_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-pink-200 rounded-full shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="email_id" className="block text-sm font-medium text-pink-700">
              Email Address
            </label>
            <input
              type="email"
              name="email_id"
              id="email_id"
              value={form.email_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-pink-200 rounded-full shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="mobile_no" className="block text-sm font-medium text-pink-700">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile_no"
              id="mobile_no"
              value={form.mobile_no}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-pink-200 rounded-full shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-pink-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={form.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-pink-200 rounded-full shadow-sm focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition duration-300"
          >
            Pay Now 
          </button>
        </form>
      </div>
    </div>
  );
}
