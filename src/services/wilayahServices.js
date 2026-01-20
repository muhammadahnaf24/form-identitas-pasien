import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.emsifa.com/api-wilayah-indonesia/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const getId = (data) => {
  if (!data) return "";
  if (typeof data === "object" && data !== null) {
    return data.id || "";
  }
  console.log("data", data);
  return data || "";
};

export default {
  getProvinces() {
    return apiClient.get("/provinces.json");
  },
  getRegencies(province_id) {
    return apiClient.get(`/regencies/${getId(province_id)}.json`);
  },
  getDistricts(regency_id) {
    return apiClient.get(`/districts/${getId(regency_id)}.json`);
  },
  getVillages(district_id) {
    return apiClient.get(`/villages/${getId(district_id)}.json`);
  },
};

console.log("wilayahServices loaded");
