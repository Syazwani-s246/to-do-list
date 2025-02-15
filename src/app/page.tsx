"use client";

import { useState } from "react";

export default function Home() {
  // State for form inputs
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState("education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3">Add Activity</h1>

      <div className="space-y-2">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
          placeholder="Price"
          className="border p-2 w-full"
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 w-full">
          {["education", "recreational", "social", "diy", "charity"].map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={bookingRequired} onChange={() => setBookingRequired(!bookingRequired)} />
          <span>Booking Required</span>
        </label>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={accessibility}
          onChange={(e) => setAccessibility(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
