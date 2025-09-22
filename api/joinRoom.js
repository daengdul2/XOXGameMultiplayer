import { redis } from "./_redis";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room");
  const room = await redis.get(`room:${roomId}`);
  if (!room) return res.json({ error: "Room tidak ditemukan" });

  if (room.players.length >= 2) return res.json({ error: "Room penuh" });

  const symbol = room.players.length === 0 ? "X" : "O";
  room.players.push(symbol);

  await redis.set(`room:${roomId}`, room);
  res.json({ roomId, symbol });
};
