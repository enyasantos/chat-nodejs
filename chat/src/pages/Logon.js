import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import '../styles/pages/logon.css';

export default function Logon() {

    const history = useHistory();

    const [ avatar, setAvatar ] = useState('');
    const [ username, setUsername ] = useState('');

    function handleSelectImages(event) {
        if(!event.target.files) {
            return;
        }

        const urlImage = URL.createObjectURL(event.target.files[0]);

        setAvatar(urlImage);
    }

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handleSubmitForm(event) {
        event.preventDefault();

        const id = uuidv4();

        localStorage.setItem('id', id);
        localStorage.setItem('avatar', avatar);
        localStorage.setItem('username', username);

        history.push('/chat');
    }

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