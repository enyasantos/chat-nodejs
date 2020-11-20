import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import '../styles/pages/register.css';

import api from '../services/api';

export default function Register() {

    const history = useHistory();

    const [ avatar, setAvatar ] = useState('');
    const [ username, setUsername ] = useState('');

    const [ idAccess, setIdAccess ] = useState('');

    const [ message, setMessage ] = useState('');

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

        if(!username.trim()) {
            setMessage('Nome de usuário inválido.');
            return;
        }

        const data = new FormData();
        data.append('id', id);
        data.append('username', username);
        data.append('avatar', avatar);

        api.post('users', data)
        .then(response => {
            localStorage.setItem('id', id);
            localStorage.setItem('username', username);

            setIdAccess(response.data.id_access);
        })
        .catch(err => {
            const message = `${err.response.status} - ${err.response.data.message}`;
            setMessage(message);
            const messageHTML = document.getElementById('message__alert-error');
            messageHTML.style.display = 'flex';
        })
    }

    function handleCloseMessage(event) {
        event.preventDefault();
        setMessage('');
    }

    function handleConfirmID(event) {
        event.preventDefault();
        history.push('/chat');
    }

    return (
        <div className="register__page">
            <form 
                onSubmit={handleSubmitForm} 
                className="form__info-user"
            >
                { idAccess && 
                <p className="message__alert message__success" id="message__alert-success">
                    <span>
                        <strong>Seu ID de acesso: </strong>
                        {idAccess}
                    </span>
                    <button className="btn__message-alert" onClick={handleConfirmID} >OK</button>
                </p>}
                { message &&
                <p className="message__alert message__error" id="message__alert-error">
                    <span>
                    <strong>Erro! </strong>
                    {message}
                    </span>
                    <button className="btn__message-alert" onClick={handleCloseMessage} >X</button>
                </p>}

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
                        value={username}
                        onChange={handleUsername}
                    />
                    <button type="submit">Continuar</button>
                </div>
            </form>
            <Link to="/">Já possui uma conta?</Link>
        </div>
    );
}