"use client";

import { useState, useEffect } from "react";

// Define structure of a Todo item
interface Todo {
  activity: string;
  price: number;
  type: string;
  bookingRequired: boolean;
  accessibility: number;
}

export default function Home() {
  // State to manage todos list
  const [todos, setTodos] = useState<Todo[]>([]);

  // State for form inputs
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [type, setType] = useState("education");
  const [bookingRequired, setBookingRequired] = useState(false);
  const [accessibility, setAccessibility] = useState(0.5);

  // Load todos from local storage when component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  // Save todos to local storage whenever the list updates
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add a new to-do item
  const addItem = () => {
    if (!activity || price === "") return; // Ensure required fields are filled
    const newItem: Todo = { activity, price: Number(price), type, bookingRequired, accessibility };
    setTodos([...todos, newItem]);

    // Reset form after adding
    setActivity("");
    setPrice("");
    setType("education");
    setBookingRequired(false);
    setAccessibility(0.5);
  };

  // Function to remove an item by index
  const removeItem = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="p-5 max-w-md mx-auto">
      {/* Header displaying total count */}
      <h1 className="text-xl font-bold mb-3">To-Do List ({todos.length})</h1>

      {/* Form for adding new to-do */}
      <div className="space-y-2">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Activity"
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
          placeholder="Price"
          required
          className="border p-2 w-full"
        />
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 w-full">
          {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map(
            (option) => (
              <option key={option} value={option}>{option}</option>
            )
          )}
        </select>

        {/* Checkbox for Booking Required */}
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={bookingRequired} onChange={() => setBookingRequired(!bookingRequired)} />
          <span>Booking Required</span>
        </label>


        {/* Slider for Accessibility */}
        <label className="block mt-2">
          <span className="font-medium">Accessibility</span>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={accessibility}
              onChange={(e) => setAccessibility(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="w-8 text-right">{accessibility.toFixed(1)}</span>
          </div>
        </label>


        {/* Button to add item */}
        <button onClick={addItem} className="bg-blue-500 text-white p-2 w-full">Add</button>
      </div>

      {/* Displaying the list */}
      <ul className="mt-5 space-y-2">
        {todos.map((todo, index) => (
          <li key={index} className="border p-2 flex justify-between items-center">
            <span>{todo.activity} - RM{todo.price} ({todo.type}) | {todo.bookingRequired ? "Booking REQUIRED" : "Booking NOT REQUIRED"} | Accessibility: {todo.accessibility}</span>
            <button onClick={() => removeItem(index)} className="bg-red-500 text-white p-1">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
