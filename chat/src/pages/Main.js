import React, { useState, useEffect } from 'react';

import '../styles/pages/main.css';

import io from "socket.io-client";

import SendMessage from '../assets/send.png';
import Keyboard from '../assets/keyboard.png';

const options = {
    rememberUpgrade:true,
    transports: ['websocket'],
    secure:true, 
    rejectUnauthorized: false
}
const socket = io('http://localhost:3001', options);
socket.on('connect', () => console.log('[IO] Connect => New connection has been established.'))

export default function Main() {

    const [ message, setMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ username, setUsername ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ id, setId ] = useState('');

    function handleInputChange(event) {
        setMessage(event.target.value)
    }

    function handleFormSubit(event) {
        event.preventDefault();
        if(message.trim()) {
            socket.emit('chat.message', {
                id,
                username,
                avatar,
                message
            })
            setMessage('');
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('username');
        const imageUrl = localStorage.getItem('avatar');
        setId(id);
        setUsername(user);
        setAvatar(imageUrl);
    }, []);

    useEffect(() => {
        function handleNewMessage (newMessage) {
            setMessages([...messages, newMessage])
        }
        socket.on('chat.message', handleNewMessage)
        return () => socket.off('chat.message', handleNewMessage)
    }, [messages]);

    return (
        <main className="content">
            <aside className="users__info">
                <div className="me__info">
                    <img className="me__avatar" src={avatar} alt={username}/>
                    <span className="online"></span>
                    <p>{username}</p>
                </div>
                <div className="users__list">
                    <header>
                        <p>Usuários onlines</p>
                    </header>
                    <ul className="list__u">
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
                        <li className="user">
                            <img className="user__profile-image" src="https://images.unsplash.com/photo-1605434939526-d237502a6f16?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" alt="Pedro Silva"/>
                            <span className="online"></span>
                            <p>Antonio Luiz</p>
                        </li>
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
                        <img className="user__avatar" src={m.avatar} alt="Pedro Silva"/>
                        <div className="chat__message-content">
                            <h3>{m.username}</h3>
                            <span>15:05</span>
                            <p>
                            {m.message}
                            </p>
                        </div>
                    </div>
                ))}
                    
                </div>
                <form className="form__message" onSubmit={handleFormSubit} >
                    <textarea
                        contenteditable="true"
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
