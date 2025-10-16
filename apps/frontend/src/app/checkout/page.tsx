"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    paymentMethod: "credit-card",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center min-h-screen text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-600">Thank you for supporting HalalChain.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto px-6 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Details */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>

          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="p-3 border border-gray-300 rounded-md w-full mt-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              required
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
        </motion.div>

        {/* Payment Method */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md w-full"
          >
            <option value="credit-card">Credit / Debit Card</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">HalalChain Wallet</option>
          </select>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          className="bg-gray-50 p-6 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-gray-700 mb-2">
            <span>Subtotal</span>
            <span>$100.00</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span>$105.00</span>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Complete Checkout"}
        </motion.button>
      </form>
    </motion.div>
  );
}
