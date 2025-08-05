// websocket.js
const WebSocket = require('ws');

// Store the WebSocket connection
let wsClient = null;

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('🔗 NodeMCU connected via WebSocket');
    wsClient = ws;

    ws.on('close', () => {
      console.log('❌ NodeMCU disconnected');
      wsClient = null;
    });

    ws.on('message', (msg) => {
      console.log('📨 Received from NodeMCU:', msg.toString());
      
      // Try to parse as JSON if possible
      try {
        const data = JSON.parse(msg.toString());
        console.log('📊 Parsed JSON data:', data);
      } catch (e) {
        // Not JSON, just plain text - already logged above
      }
    });

    ws.on('error', (error) => {
      console.log('🚨 WebSocket error:', error.message);
    });

    // Send welcome message to confirm connection
    ws.send('Hello from Node.js Server!');
  });
};

// Add this function to your websocket.js file
const sendToNodeMCU = (data) => {
  if (!wsClient || wsClient.readyState !== WebSocket.OPEN) {
    console.log('❌ Cannot send - NodeMCU not connected');
    return false;
  }

  // Convert data to JSON string if it's an object
  const message = typeof data === 'object' ? JSON.stringify(data) : data;
  
  wsClient.send(message);
  console.log('📤 Sent to NodeMCU:', message);
  return true;
};

// Update your module.exports to include the new function
module.exports = { setupWebSocket, sendToNodeMCU };
