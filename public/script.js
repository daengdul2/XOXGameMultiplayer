console.log("✅ script.js sudah terhubung!");
let roomId = null;
let symbol = null;

const createBtn = document.getElementById("createBtn");
const joinBtn = document.getElementById("joinBtn");
const resetBtn = document.getElementById("resetBtn");
const roomIdInput = document.getElementById("roomIdInput");
const status = document.getElementById("status");
const boardEl = document.getElementById("board");

function renderBoard(board) {
  boardEl.innerHTML = "";
  board.forEach((cell, i) => {
    const div = document.createElement("div");
    div.className = "cell";
    div.textContent = cell || "";
    div.onclick = () => {
      if (!cell && roomId) {
        fetch(`/api/move?room=${roomId}&symbol=${symbol}&index=${i}`);
      }
    };
    boardEl.appendChild(div);
  });
}

createBtn.onclick = async () => {
  const res = await fetch("/api/createRoom");
  const data = await res.json();
  roomId = data.roomId;
  symbol = data.symbol;
  status.textContent = `Room dibuat: ${roomId} | Kamu ${symbol}`;
  pollState();
};

joinBtn.onclick = async () => {
  const id = roomIdInput.value.trim();
  if (!id) return;
  const res = await fetch(`/api/joinRoom?room=${id}`);
  const data = await res.json();
  if (data.error) return alert(data.error);
  roomId = data.roomId;
  symbol = data.symbol;
  status.textContent = `Gabung ke room: ${roomId} | Kamu ${symbol}`;
  pollState();
};

resetBtn.onclick = () => {
  if (roomId) fetch(`/api/createRoom?room=${roomId}&reset=1`);
};

async function pollState() {
  if (!roomId) return;
  setInterval(async () => {
    const res = await fetch(`/api/state?room=${roomId}`);
    const data = await res.json();
    if (data.error) return;
    renderBoard(data.board);
    if (data.winner) {
      status.textContent = data.winner === "Draw" ? "Seri!" : `${data.winner} menang!`;
    } else {
      status.textContent = `Giliran: ${data.turn}`;
    }
  }, 1500);
}

