// websocket.js
const WebSocket = require('ws');

// Store connections
let wsClient = null; // NodeMCU connection
let webClients = new Set(); // Web browser connections
let deviceInfo = null;
let deviceLastSeen = null;

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const userAgent = req.headers['user-agent'] || '';
    const isWebBrowser = userAgent.includes('Mozilla') || req.url === '/web';
    
    if (isWebBrowser) {
      // Web browser connection
      console.log('🌐 Web browser connected via WebSocket');
      webClients.add(ws);
      
      // Send current device status to new web client
      const currentlyConnected = wsClient !== null && wsClient.readyState === WebSocket.OPEN;
      const statusMessage = {
        command: 'device_status_update',
        device_connected: currentlyConnected,
        device_info: currentlyConnected ? deviceInfo : null,
        last_seen: deviceLastSeen,
        server_time: new Date().toISOString()
      };
      
      console.log(`📤 Sending initial status to web client: Connected=${currentlyConnected}`);
      ws.send(JSON.stringify(statusMessage));
      
      ws.on('close', () => {
        console.log('🌐 Web browser disconnected');
        webClients.delete(ws);
      });
      
      ws.on('message', (msg) => {
        try {
          const data = JSON.parse(msg.toString());
          if (data.command === 'web_ping') {
            ws.send(JSON.stringify({ command: 'web_pong' }));
          }
        } catch (e) {
          // Handle non-JSON messages from web
        }
      });
      
    } else {
      // NodeMCU connection
      console.log('🔗 NodeMCU connected via WebSocket');
      wsClient = ws;
      deviceLastSeen = new Date().toISOString();
      
      // Notify all web clients that device connected
      broadcastToWebClients({
        command: 'device_connected',
        device_connected: true,
        timestamp: deviceLastSeen
      });

      ws.on('close', () => {
        console.log('❌ NodeMCU disconnected');
        wsClient = null;
        deviceInfo = null;  // Clear device info immediately
        deviceLastSeen = new Date().toISOString();
        
        console.log('🧹 Cleared device info and notifying web clients');
        
        // 🚨 Notify all web clients that device disconnected
        broadcastToWebClients({
          command: 'device_disconnected',
          device_connected: false,
          timestamp: deviceLastSeen,
          reason: 'NodeMCU connection closed',
          device_info: null  // Explicitly set to null
        });
      });

      ws.on('message', (msg) => {
        const message = msg.toString();
        console.log('📨 Received from NodeMCU:', message);
        deviceLastSeen = new Date().toISOString();
        
        // Try to parse as JSON if possible
        try {
          const data = JSON.parse(message);
          console.log('📊 Parsed JSON data:', data);
          
          // Handle different command types
          handleWebSocketMessage(data, ws);
          
          // Forward certain messages to web clients
          if (['device_startup', 'sensor_data'].includes(data.command)) {
            // Only forward device_startup if it's recent
            if (data.command === 'device_startup') {
              const messageAge = Date.now() - (data.timestamp || 0);
              if (messageAge < 60000) { // Only forward if less than 1 minute old
                broadcastToWebClients(data);
              } else {
                console.log('⏰ Not forwarding old device_startup (age: ' + Math.round(messageAge/1000) + 's)');
              }
            } else {
              broadcastToWebClients(data);
            }
          }
          
        } catch (e) {
          // Not JSON, handle as plain text
          handlePlainTextMessage(message, ws);
        }
      });

      ws.on('error', (error) => {
        console.log('🚨 WebSocket error:', error.message);
        // Don't immediately disconnect, but notify web clients of error
        broadcastToWebClients({
          command: 'device_error',
          error: error.message,
          timestamp: new Date().toISOString()
        });
      });

      // Send welcome message to confirm connection
      ws.send('Hello from Node.js Server! Waiting for startup command...');
    }
  });

  // Monitor device health
  setInterval(() => {
    if (wsClient && wsClient.readyState === WebSocket.OPEN) {
      // Device is connected
      const timeSinceLastSeen = deviceLastSeen ? (Date.now() - new Date(deviceLastSeen).getTime()) : 0;
      
      // If no message received for 30 seconds, consider it disconnected
      if (timeSinceLastSeen > 30000) {
        console.log('⚠️  NodeMCU seems inactive (no messages for 30s) - DISCONNECTING');
        
        // 🚨 IMPORTANT: Clear the wsClient when device becomes inactive
        wsClient = null;
        deviceInfo = null;
        
        broadcastToWebClients({
          command: 'device_inactive',
          device_connected: false,
          reason: 'No activity for 30 seconds',
          last_seen: deviceLastSeen
        });
      }
    } else if (wsClient) {
      // Connection exists but not open
      console.log('❌ NodeMCU connection not open, cleaning up');
      wsClient = null;
      deviceInfo = null;
      broadcastToWebClients({
        command: 'device_disconnected',
        device_connected: false,
        reason: 'Connection not open'
      });
    }
  }, 10000); // Check every 10 seconds
};

// 🚨 Broadcast message to all connected web clients
const broadcastToWebClients = (message) => {
  const messageStr = typeof message === 'object' ? JSON.stringify(message) : message;
  
  webClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(messageStr);
        console.log('📤 Broadcasted to web client:', messageStr);
      } catch (error) {
        console.log('❌ Failed to send to web client:', error.message);
        webClients.delete(client);
      }
    } else {
      webClients.delete(client);
    }
  });
};

// 🚀 Handle different types of WebSocket messages
const handleWebSocketMessage = (data, ws) => {
  const { command } = data;

  // If no command specified, try to detect message type
  if (!command) {
    // Check if it looks like sensor data
    if (data.temperature !== undefined && data.humidity !== undefined) {
      console.log('📊 Detected sensor data (no command field)');
      handleSensorData(data);
      return;
    }
    
    // Check if it looks like startup data
    if (data.device && data.wifi_ip) {
      console.log('🚀 Detected startup data (no command field)');
      handleDeviceStartup(data, ws);
      return;
    }
    
    console.log('🤔 Unknown message format (no command field):', data);
    return;
  }

  switch (command) {
    case 'device_startup':
      handleDeviceStartup(data, ws);
      break;
      
    case 'sensor_data':
      handleSensorData(data);
      break;
      
    case 'pattern':
      handlePatternCommand(data);
      break;
      
    case 'status':
      handleStatusUpdate(data);
      break;
      
    default:
      console.log(`🤔 Unknown command: ${command}`);
      break;
  }
};

// 🔌 Handle device startup command
const handleDeviceStartup = (data, ws) => {
  console.log('\n🚀 === DEVICE STARTUP DETECTED ===');
  console.log(`📱 Device: ${data.device || 'Unknown'}`);
  console.log(`🌐 Device IP: ${data.wifi_ip || 'Unknown'}`);
  console.log(`🔧 MAC Address: ${data.mac_address || 'Unknown'}`);
  console.log(`⏰ Boot Time: ${new Date().toLocaleString()}`);
  console.log(`🕐 Device Uptime: ${data.timestamp || 0}ms`);
  console.log(`📡 Boot Reason: ${data.boot_reason || 'Unknown'}`);
  
  // Store device information
  deviceInfo = {
    ...data,
    server_connection_time: new Date().toISOString(),
    last_seen: new Date().toISOString()
  };
  deviceLastSeen = new Date().toISOString();
  
  // Send acknowledgment back to ESP8266
  const ackMessage = {
    command: 'startup_ack',
    message: 'Startup command received successfully!',
    server_time: new Date().toISOString(),
    status: 'connected'
  };
  
  ws.send(JSON.stringify(ackMessage));
  console.log('✅ Sent startup acknowledgment to NodeMCU');
  
  // Notify web clients of startup
  broadcastToWebClients({
    command: 'device_startup',
    device_connected: true,
    device_info: deviceInfo,
    timestamp: deviceLastSeen
  });
  
  // Optional: Trigger a welcome pattern
  setTimeout(() => {
    triggerWelcomePattern();
  }, 2000);
  
  console.log('=================================\n');
};

// 🌡️ Handle sensor data
const handleSensorData = (data) => {
  console.log(`📊 Sensor Data - Temp: ${data.temperature}°C, Humidity: ${data.humidity}%, Light: ${data.light}, Free Heap: ${data.heap_free}bytes`);
  
  // Update last seen time
  deviceLastSeen = new Date().toISOString();
  if (deviceInfo) {
    deviceInfo.last_seen = deviceLastSeen;
  }
};

// 🎨 Handle pattern commands
const handlePatternCommand = (data) => {
  console.log(`🎨 Pattern Command - #${data.pattern}: ${data.pattern_name || 'Unknown'}`);
  if (data.source) {
    console.log(`🔍 Source: ${data.source}`);
  }
};

// 📊 Handle status updates
const handleStatusUpdate = (data) => {
  console.log(`📊 Status Update: ${JSON.stringify(data)}`);
  deviceLastSeen = new Date().toISOString();
  if (deviceInfo) {
    deviceInfo.last_seen = deviceLastSeen;
  }
};

// 💬 Handle plain text messages
const handlePlainTextMessage = (message, ws) => {
  console.log('💬 Plain text message:', message);
  
  // Handle simple commands
  if (message === 'POWER_UP') {
    console.log('🔌 SIMPLE POWER UP COMMAND RECEIVED!');
    ws.send('Power up acknowledged');
    broadcastToWebClients({
      command: 'device_startup',
      device_connected: true,
      message: 'Simple power up detected'
    });
  }
  else if (message.startsWith('CHAR:')) {
    console.log('🔤 Character command:', message);
  }
  else if (message.startsWith('PATTERN:')) {
    console.log('🎨 Pattern command:', message);
  }
};

// 🎆 Trigger welcome pattern on startup
const triggerWelcomePattern = () => {
  if (!wsClient || wsClient.readyState !== WebSocket.OPEN) {
    console.log('❌ Cannot send welcome pattern - NodeMCU not connected');
    return;
  }
  
  const welcomePattern = {
    command: 'pattern',
    pattern: 6, // Fireworks pattern as welcome
    pattern_name: 'Welcome Fireworks',
    source: 'server_startup_auto'
  };
  
  wsClient.send(JSON.stringify(welcomePattern));
  console.log('🎆 Sent welcome pattern to NodeMCU');
};

// Function to send data to NodeMCU
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

// Get current device information
const getDeviceInfo = () => {
  return deviceInfo;
};

// Check if device is connected
const isDeviceConnected = () => {
  const connected = wsClient && wsClient.readyState === WebSocket.OPEN;
  console.log(`🔍 isDeviceConnected() called: ${connected}`);
  return connected;
};

module.exports = { 
  setupWebSocket, 
  sendToNodeMCU, 
  getDeviceInfo, 
  isDeviceConnected 
};