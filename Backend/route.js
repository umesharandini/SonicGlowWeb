// route.js
const express = require('express');
const router = express.Router();
const { sendToNodeMCU, getDeviceInfo, isDeviceConnected } = require('./websocket');

// If you have a controller, keep the existing route
// const { handleTextInput } = require('./controller');
// router.post('/display-text', handleTextInput);

// ===== DEVICE CONTROL ROUTES =====

// Send pattern command
router.post('/pattern', (req, res) => {
  const { pattern } = req.body;

  const patternNames = {
    1: "Rain Effect", 2: "Spiral", 3: "Wave", 4: "Explosion", 5: "Snake",
    6: "Fireworks", 7: "Breathing", 8: "Matrix Rain", 9: "Cube Rotate", 10: "Random Sparkle"
  };

  const message = {
    command: "pattern",
    pattern: parseInt(pattern),
    pattern_name: patternNames[pattern] || "Unknown Pattern",
    source: "api_route"
  };

  const success = sendToNodeMCU(message);

  if (success) {
    res.json({ success: true, message: `Pattern ${pattern} sent successfully` });
  } else {
    res.status(500).json({ success: false, message: 'NodeMCU not connected' });
  }
});

// LED control
router.post('/led', (req, res) => {
  const { state } = req.body;
  
  if (typeof state !== 'boolean') {
    return res.status(400).json({
      success: false,
      message: 'State must be boolean (true/false)'
    });
  }
  
  const message = {
    command: "led_control",
    state: state,
    source: "api_route"
  };
  
  const success = sendToNodeMCU(message);
  
  if (success) {
    res.json({
      success: true,
      message: `LED turned ${state ? 'ON' : 'OFF'}`
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'NodeMCU not connected'
    });
  }
});

// Send text/message
router.post('/message', (req, res) => {
  const { text, message } = req.body;
  const textToSend = text || message;
  
  if (!textToSend) {
    return res.status(400).json({
      success: false,
      message: 'Text or message is required'
    });
  }
  
  const success = sendToNodeMCU(textToSend);
  
  if (success) {
    res.json({
      success: true,
      message: 'Message sent successfully',
      sent_text: textToSend
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'NodeMCU not connected'
    });
  }
});

// ===== DEVICE STATUS ROUTES =====

// Get device status
router.get('/status', (req, res) => {
  const deviceInfo = getDeviceInfo();
  const isConnected = isDeviceConnected();
  
  if (!isConnected) {
    return res.status(404).json({
      success: false,
      message: 'Device not connected',
      connected: false
    });
  }
  
  res.json({
    success: true,
    connected: isConnected,
    device_info: deviceInfo
  });
});

// Request fresh status from device
router.post('/refresh-status', (req, res) => {
  const message = {
    command: "get_status",
    source: "api_route"
  };
  
  const success = sendToNodeMCU(message);
  
  if (success) {
    res.json({
      success: true,
      message: 'Status refresh requested'
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'NodeMCU not connected'
    });
  }
});

// ===== UTILITY ROUTES =====

// List available patterns
router.get('/patterns', (req, res) => {
  const patterns = {
    1: "Rain Effect", 2: "Spiral", 3: "Wave", 4: "Explosion", 5: "Snake",
    6: "Fireworks", 7: "Breathing", 8: "Matrix Rain", 9: "Cube Rotate", 10: "Random Sparkle"
  };
  
  res.json({
    success: true,
    patterns: patterns
  });
});

module.exports = router;