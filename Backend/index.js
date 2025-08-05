// index.js
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const http = require('http');
const { setupWebSocket, sendToNodeMCU } = require('./websocket');

const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Simple health check endpoint (optional)
app.get('/', (req, res) => {
  res.send('WebSocket Server is running!');
});

app.post('/send-test', (req, res) => {
  const { text } = req.body;

  console.log(text);
  const success = sendToNodeMCU(text);

  if (success) {
    res.send('Data sent to NodeMCU! Check console.');
  } else {
    res.send('Failed to send - NodeMCU not connected');
  }
});

// ✅ New route to send pattern commands
app.post('/send-pattern', (req, res) => {
  const { pattern } = req.body;

  const patternNames = {
    1: "Rain Effect", 2: "Spiral", 3: "Wave", 4: "Explosion", 5: "Snake",
    6: "Fireworks", 7: "Breathing", 8: "Matrix Rain", 9: "Cube Rotate", 10: "Random Sparkle"
  };

  const message = {
    command: "pattern",
    pattern: parseInt(pattern),
    pattern_name: patternNames[pattern] || "Unknown Pattern"
  };

  const success = sendToNodeMCU(JSON.stringify(message));

  if (success) {
    res.json({ success: true, message: `Pattern ${pattern} sent successfully` });
  } else {
    res.status(500).json({ success: false, message: 'NodeMCU not connected' });
  }
});

// WebSocket setup
setupWebSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
  console.log(`🌐 WebSocket ready for NodeMCU connections`);
  console.log(`📍 NodeMCU should connect to: ws://YOUR_IP:${PORT}`);
});
