const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"] }));

// in-memory store for demo
const mem = { logs: [] };

app.get("/health", (_req, res) => res.status(200).send("ok"));

app.post("/payments/log", (req, res) => {
  const { from, to, amount, txHash } = req.body || {};
  const entry = {
    id: String(mem.logs.length + 1),
    from,
    recipient: to,
    amount,
    txHash,
    timestamp: Date.now(),
    settled: true,
  };
  mem.logs.push(entry);
  res.json(entry);
});

app.get("/payments/history", (req, res) => {
  const user = String(req.query.user || "").toLowerCase();
  const out = mem.logs.filter(x => (x.from || "").toLowerCase() === user);
  res.json(out);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API on", PORT));
