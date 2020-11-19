import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import '../styles/pages/logon.css';

import api from '../services/api';

export default function Logon() {

    const history = useHistory();

    const [ avatar, setAvatar ] = useState('');
    const [ username, setUsername ] = useState('');

    function handleSelectImages(event) {
        if(!event.target.files) {
            return;
        }
       setAvatar(event.target.files[0]);
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        const id = uuidv4();

        const data = new FormData();
        data.append('id', id);
        data.append('username', username);
        data.append('avatar', avatar);

        api.post('users', data)
        .then(response => {
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);
                
            history.push('/chat');
        })
        .catch(err => console.error(err))
    }

    useEffect(() => {
        const id = localStorage.getItem('id');
        const user = localStorage.getItem('username');
        const imageUrl = localStorage.getItem('avatar');

        if( id && user && imageUrl ) 
            history.push('/chat');
        
    }, []);

    return (
        <div className="logo__page">
            <form 
                onSubmit={handleSubmitForm} 
                className="form__info-user"
            >
                <label htmlFor="avatar">Adicionar imagem</label>
                <input 
                    type="file" 
                    id="avatar" 
                    onChange={handleSelectImages}
                />
                <label htmlFor="username">Username</label>
                <div className="user__name">
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        onChange={handleUsername}
                    />
                    <button type="submit">Continuar</button>
                </div>
            </form>
        </div>
    );
}