import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createEmployee } from "../api/employeeApi";

const AddEmployee: React.FC<{ onEmployeeAdded: () => void }> = ({ onEmployeeAdded }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
      .required("Name is required"),
    email: Yup.string()
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    position: Yup.string()
      .min(2, "Position must be at least 2 characters")
      .required("Position is required"),
  });

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mb-6">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>

      <Formik
        initialValues={{ name: "", email: "", position: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setErrorMessage(null); // clear old error
          try {
            await createEmployee(values);
            onEmployeeAdded(); // refresh the list
            resetForm();
          } catch (err: any) {
            console.error("Error adding employee:", err);
            setErrorMessage(err.message); // show backend error (e.g., "Email already exists")
          }
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div className="mb-3">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-3">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-3">
              <Field
                type="text"
                name="position"
                placeholder="Position"
                className="border p-2 w-full rounded"
              />
              <ErrorMessage
                name="position"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Show API error messages */}
            {errorMessage && (
              <div className="text-red-600 mb-3 text-sm">{errorMessage}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-4 py-2 rounded text-white ${
                isSubmitting || !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Employee"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEmployee;
