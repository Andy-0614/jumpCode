import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//
import dotenv from "dotenv";
import { resolve } from "path";
//
const rootDir = resolve(__dirname, "..");
dotenv.config({ path: `${rootDir}/.env` });
//
const ip = process.env.VITE_ip!;
const port = parseInt(process.env.VITE_UIport || "127.0.0.1");
//
export default defineConfig({
  plugins: [vue()],
  server: {
    host: ip,
    port: port,
  },
});
