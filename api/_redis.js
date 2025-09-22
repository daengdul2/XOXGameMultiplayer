import { Redis } from "@upstash/redis";

// koneksi ke Upstash Redis (gunakan env variable di Vercel Dashboard)
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});
