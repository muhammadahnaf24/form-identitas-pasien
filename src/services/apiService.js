import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api", // Sesuaikan port backend Anda
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  login(credentials) {
    return apiClient.post("/login", credentials);
  },

  // Ambil pasien method GET sudah benar
  getPasien(noReg) {
    return apiClient.get(`/pasien/${noReg}`);
  },
};
