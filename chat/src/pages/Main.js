import React, { useState, useEffect } from 'react';

import '../styles/pages/main.css';

import { useHistory } from 'react-router-dom';

import socket from '../services/socket';

import SendMessage from '../assets/send.png';
import Keyboard from '../assets/keyboard.png';

import api from '../services/api';

export default function Main() {

    const history = useHistory();

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ username, setUsername ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ id, setId ] = useState('');

    const [ usersOnline, setUsersOnline ] = useState([]);
    
    function handleInputChange(event) {
        setMessage(event.target.value)
    }

    function handleFormSubit(event) {
        event.preventDefault();
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        if(message.trim()) {
            socket.emit('chat.message', {
                id,
                username,
                avatar,
                message,
                time
            })
            setMessage('');
        }
    }

    function handleLogout(event) {
        event.preventDefault();
        localStorage.clear();

        socket.emit("user_disconnected", id);

        history.push('/');
    }

    useEffect(() => {
        api.get('/')
        .then(response => {
            const data = response.data;
            const messagesAPI = data.map( i => {
                return {
                    id: i.user_id,
                    username: i.username,
                    avatar: i.image,
                    time: i.time,
                    message: i.content,
                }
            });
            setMessages(messagesAPI)
        })
        .catch(err => console.error(err));


        const id = localStorage.getItem('id');
        api.get(`users/${id}`)
        .then( response => {
            setId(response.data[0].id);
            setUsername(response.data[0].username);
            setAvatar(response.data[0].image);
        })
        .catch( err => console.error(err))


        function handleUserOnline (data) {
            setUsersOnline(data);
        }
        socket.on("user_connected", handleUserOnline);
    

    }, []);

    useEffect(() => {
        function handleNewMessage (newMessage) {
            setMessages([...messages, newMessage])
        }
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage )
    }, [messages]);

    return (
        <main className="content">
            <aside className="users__info">
                <div className="me__info">
                    <button 
                        onClick={handleLogout}
                        className="btn__logout"
                    >
                        Sair
                    </button>
                    <img className="me__avatar" src={`http://localhost:3001/uploads/${avatar}`} alt={username}/>
                    <span className="online"></span>
                    <p>{username}</p>
                </div>
                <div className="users__list">
                    <header>
                        <p>Usuários onlines</p>
                    </header>
                    <ul className="list__u">
                        {usersOnline.map(u => (
                            <li className="user">
                                <img className="user__profile-image" src={`http://localhost:3001/uploads/${u.avatar}`} alt={u.username}/>
                                <span className="online"></span>
                                <p>{u.username}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            <section className="chat">
                <div className="chat__messages">
                {messages.map((m, index) => (
                    <div 
                        key={index}
                        className={`chat__message ${ m.id === id && 'my__message' }`}
                    >
                        <img className="user__avatar" src={`http://localhost:3001/uploads/${m.avatar}`} alt={m.username}/>
                        <div className="chat__message-content">
                            <h3>{m.username}</h3>
                            <span>{m.time}</span>
                            <p>
                            {m.message}
                            </p>
                        </div>
                    </div>
                ))}
                    
                </div>
                <form className="form__message" onSubmit={handleFormSubit} >
                    <textarea
                        wrap="hard"
                        className="form__message-text"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Mensagem..."
                        ></textarea>
                        {/* <div className="form__message-text">
                            <div 
                                id="message__text"
                                className="text"
                                wrap="hard"
                                contenteditable="true"
                                spellcheck="false"
                            >
                                {message}
                            </div>
                        </div> */}
                    <button type="submit" className="btn__send-message">
                        <img 
                            src={ message.trim() ? SendMessage : Keyboard } 
                            alt=""
                        />
                    </button>
                </form>
            </section>
        </main>
    );
}
