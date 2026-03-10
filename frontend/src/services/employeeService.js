import axios from 'axios';

const API_URL = 'http://localhost:8000/employees';

export const employeeService = {
  getAll: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (employee) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
  },

  update: async (id, employee) => {
    const response = await axios.put(`${API_URL}/${id}`, employee);
    return response.data;
  },

  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  }
};
