import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import io from 'socket.io-client';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
const socket = io(BACKEND_URL);

const CalendarView = () => {
  const [events, setEvents] = useState([]);

  // Fetch events on mount
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error("Error fetching events:", err));
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    socket.on('eventAdded', event => setEvents(prev => [...prev, event]));
    socket.on('eventUpdated', event =>
      setEvents(prev => prev.map(e => (e.id === event.id ? event : e)))
    );
    socket.on('eventDeleted', ({ id }) =>
      setEvents(prev => prev.filter(e => e.id !== id))
    );
    return () => {
      socket.off('eventAdded');
      socket.off('eventUpdated');
      socket.off('eventDeleted');
    };
  }, []);

  // Handler when selecting a date slot
  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("Enter event title:");
    if (!title) return;
    const color = window.prompt("Enter event background color (e.g., #ff0000):", "#1e90ff");
    const newEvent = { title, start, end, backgroundColor: color };
    fetch(`${BACKEND_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    }).catch(err => console.error("Error adding event:", err));
  };

  // Custom style getter for events
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.backgroundColor || "#1e90ff",
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0',
      display: 'block',
      padding: '2px 4px',
    };
    return { style };
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarView;
