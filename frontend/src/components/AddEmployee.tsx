import React, { useState } from "react";
import { createEmployee } from "../api/employeeApi";

const AddEmployee: React.FC<{ onEmployeeAdded: () => void }> = ({ onEmployeeAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !position) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await createEmployee({ name, email, position });
      onEmployeeAdded(); // refresh the list
      setName("");
      setEmail("");
      setPosition("");
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to add employee");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Position"
          className="border p-2 w-full rounded"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Employee
      </button>
    </form>
  );
};

export default AddEmployee;
