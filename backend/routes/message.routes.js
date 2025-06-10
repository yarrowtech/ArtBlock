const express = require('express');
const router = express.Router();
const Message = require('../models/message.model');
const auth = require('../middleware/auth');

// Send a message
router.post('/', auth, async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    
    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      content,
      attachments: req.body.attachments || []
    });

    await message.save();
    
    await message.populate('sender', 'username profileImage');
    await message.populate('recipient', 'username profileImage');

    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get conversation with a specific user
router.get('/conversation/:userId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: req.params.userId },
        { sender: req.params.userId, recipient: req.user._id }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'username profileImage')
    .populate('recipient', 'username profileImage');

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all conversations for the current user
router.get('/conversations', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id },
        { recipient: req.user._id }
      ]
    })
    .sort({ createdAt: -1 })
    .populate('sender', 'username profileImage')
    .populate('recipient', 'username profileImage');

    // Group messages by conversation
    const conversations = messages.reduce((acc, message) => {
      const otherUser = message.sender._id.equals(req.user._id) 
        ? message.recipient 
        : message.sender;
      
      const conversationId = otherUser._id.toString();
      
      if (!acc[conversationId]) {
        acc[conversationId] = {
          user: otherUser,
          lastMessage: message,
          unreadCount: message.sender._id.equals(req.user._id) || message.read ? 0 : 1
        };
      }
      return acc;
    }, {});

    res.json(Object.values(conversations));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mark messages as read
router.post('/read/:senderId', auth, async (req, res) => {
  try {
    await Message.updateMany(
      {
        sender: req.params.senderId,
        recipient: req.user._id,
        read: false
      },
      {
        read: true
      }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a message
router.delete('/:messageId', auth, async (req, res) => {
  try {
    const message = await Message.findOne({
      _id: req.params.messageId,
      $or: [
        { sender: req.user._id },
        { recipient: req.user._id }
      ]
    });

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.remove();
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 