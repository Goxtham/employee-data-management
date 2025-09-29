import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

export const getEmployees = () => axios.get(API_URL);
export const createEmployee = (data: { name: string; email: string; position: string }) => axios.post(API_URL, data);
export const updateEmployee = (id: number, data: { name: string; email: string; position: string }) => axios.put(`${API_URL}/${id}`, data);
export const deleteEmployee = (id: number) => axios.delete(`${API_URL}/${id}`);
