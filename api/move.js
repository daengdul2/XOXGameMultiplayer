import { redis } from "./_redis";
import { checkWinner } from "./_helpers";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room");
  const symbol = url.searchParams.get("symbol");
  const index = parseInt(url.searchParams.get("index"), 10);

  const raw = await redis.get(`room:${roomId}`);
  if (!raw) return res.status(400).json({ error: "Room tidak ada" });

  const room = JSON.parse(raw);
  if (room.winner) return res.status(200).json(room);
  if (room.turn !== symbol) return res.status(400).json({ error: "Bukan giliranmu" });
  if (room.board[index]) return res.status(400).json({ error: "Sudah diisi" });

  room.board[index] = symbol;
  room.winner = checkWinner(room.board);
  if (!room.winner) {
    room.turn = symbol === "X" ? "O" : "X";
  }

  await redis.set(`room:${roomId}`, JSON.stringify(room));
  res.status(200).json(room);
};
