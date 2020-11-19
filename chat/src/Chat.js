import React, { useState, useEffect } from 'react';
import io from "socket.io-client";
import uuid from 'uuid/v4';

import './chat.css';

const myId = uuid();
const options = {
    rememberUpgrade:true,
    transports: ['websocket'],
    secure:true, 
    rejectUnauthorized: false
}
const socket = io('http://localhost:3001', options);
socket.on('connect', () => console.log('[IO] Connect => New connection has been established.'))

export default function Chat() {

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    function handleInputChange(event) {
        setMessage(event.target.value)
    }

    function handleFormSubit(event) {
        event.preventDefault();
        if(message.trim()) {
            socket.emit('chat.message', {
                id: myId,
                message
            })
            setMessage('');
        }

    }

    useEffect(() => {
        function handleNewMessage (newMessage) {
            setMessages([...messages, newMessage])
        }
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage)
    }, [messages]);

    return (
    <main className="container">
        <ul className="list">
            {messages.map((m, index) => (
                <li 
                    className={`list__item list__item--${m.id === myId ? 'mine' : 'other'}`}
                    key={index}
                >
                    <img 
                        className="list__image"
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80" 
                        alt=""
                    />
                    <span className={`message message--${m.id === myId ? 'mine' : 'other'}`}>
                        {m.message}
                    </span>
                </li>
            ))}
        </ul>
        <form onSubmit={handleFormSubit} className="form">
            <input 
                type="text" 
                className="form__field" 
                placeholder="Type a new message here"
                value={message}
                onChange={handleInputChange}
            />
        </form>
    </main>
  );
}
