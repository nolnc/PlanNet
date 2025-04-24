const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// In-memory storage for events (for demo purposes)
let events = [];

// API Endpoints for event management
app.get('/api/events', (req, res) => {
  res.json(events);
});

app.post('/api/events', (req, res) => {
  const event = req.body;
  event.id = Date.now(); // Simple unique ID assignment
  events.push(event);
  io.emit('eventAdded', event);
  res.status(201).json(event);
});

app.put('/api/events/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedEvent = req.body;
  events = events.map(e => (e.id === id ? updatedEvent : e));
  io.emit('eventUpdated', updatedEvent);
  res.json(updatedEvent);
});

app.delete('/api/events/:id', (req, res) => {
  const id = Number(req.params.id);
  events = events.filter(e => e.id !== id);
  io.emit('eventDeleted', { id });
  res.json({ id });
});

// Socket.IO for real-time collaboration
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => console.log('A user disconnected'));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
