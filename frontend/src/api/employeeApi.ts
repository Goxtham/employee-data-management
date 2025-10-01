import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

// GET employees
export const getEmployees = async () => {
  try {
    return await axios.get(API_URL);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to fetch employees");
  }
};

// CREATE employee
export const createEmployee = async (data: { name: string; email: string; position: string }) => {
  try {
    return await axios.post(API_URL, data);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to add employee");
  }
};

// UPDATE employee
export const updateEmployee = async (id: number, data: { name: string; email: string; position: string }) => {
  try {
    return await axios.put(`${API_URL}/${id}`, data);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to update employee");
  }
};

// DELETE employee
export const deleteEmployee = async (id: number) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Failed to delete employee");
  }
};
