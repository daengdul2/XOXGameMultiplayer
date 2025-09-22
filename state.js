import { redis } from "./_redis";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room");
  const room = await redis.get(`room:${roomId}`);
  if (!room) return res.json({ error: "Room tidak ditemukan" });

  res.json(room);
};