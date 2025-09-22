import { redis } from "./_redis";
import { checkWinner } from "./_helpers";

export default async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const roomId = url.searchParams.get("room");
  const index = parseInt(url.searchParams.get("index"));
  const symbol = url.searchParams.get("symbol");

  const room = await redis.get(`room:${roomId}`);
  if (!room) return res.json({ error: "Room tidak ditemukan" });

  if (!room.board[index] && room.turn === symbol && !room.winner) {
    room.board[index] = symbol;
    room.winner = checkWinner(room.board);
    room.turn = room.turn === "X" ? "O" : "X";
    await redis.set(`room:${roomId}`, room);
  }

  res.json({ success: true });
};