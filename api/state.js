import { redis } from "./_redis";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room");

  const raw = await redis.get(`room:${roomId}`);
  if (!raw) return res.status(400).json({ error: "Room tidak ada" });

  res.status(200).json(JSON.parse(raw));
};
