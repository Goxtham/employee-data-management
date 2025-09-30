import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateEmployee } from "../api/employeeApi";

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

interface Props {
  employee: Employee;
  onClose: () => void;
  onUpdate: () => void;
}

const EditEmployeeModal: React.FC<Props> = ({ employee, onClose, onUpdate }) => {
  // Validation rules
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
      .required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    position: Yup.string()
      .min(2, "Position must be at least 2 characters")
      .required("Position is required"),
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>

        <Formik
          initialValues={{
            name: employee.name,
            email: employee.email,
            position: employee.position,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateEmployee(employee.id, values);
              onUpdate(); // refresh list
              onClose();  // close modal
            } catch (err) {
              console.error("Failed to update employee:", err);
              alert("Error updating employee");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              <div className="mb-3">
                <Field
                  type="text"
                  name="name"
                  className="border p-2 w-full rounded"
                  placeholder="Name"
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
                  className="border p-2 w-full rounded"
                  placeholder="Email"
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
                  className="border p-2 w-full rounded"
                  placeholder="Position"
                />
                <ErrorMessage
                  name="position"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded border hover:bg-gray-100"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`px-4 py-2 rounded text-white ${
                    isSubmitting || !isValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
