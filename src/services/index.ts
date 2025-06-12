import axios from "axios";

export const HttpClient = axios.create({
  baseURL: "https://leaderboard-backend-production-c31a.up.railway.app/",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});
