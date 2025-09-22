import { redis } from "./_redis";
import { newRoom } from "./_helpers";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const reset = url.searchParams.get("reset");

  // kalau tidak dikirim, buat random roomId
  let roomId = url.searchParams.get("room") || Math.random().toString(36).substr(2, 5);

  // buat room baru kalau reset=1 atau room belum ada
  if (reset || !(await redis.exists(`room:${roomId}`))) {
    await redis.set(`room:${roomId}`, newRoom());
  }

  // pemain pertama selalu "X"
  res.status(200).json({ roomId, symbol: "X" });
};
