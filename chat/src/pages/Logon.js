import React, { useState } from 'react';

import { useHistory, Link } from 'react-router-dom';

import '../styles/pages/logon.css';

import api from '../services/api';

import socket from '../services/socket';

export default function Logon() {

    const history = useHistory();

    const [idAccess, setIdAcess] = useState('');
    const [message, setMessage] = useState('');

    function handleSubmitForm(event) {
        event.preventDefault();

        if (!idAccess.trim()) {
            setMessage('ID inválido.');
            return;
        }

        const data = { id: idAccess }

        api.post('logon', data)
            .then(response => {
                const id = response.data.id;
                localStorage.setItem('id', id);
                setIdAcess('');

                socket.emit("user_connected", id);

                history.push('/chat');
            })
            .catch(err => {
                const message = `${err.response.status} - ${err.response.data.message}`;
                setMessage(message);
                const messageHTML = document.getElementById('message__alert');
                messageHTML.style.display = 'flex';
            })
    }

    // 85b1d3bc
    // 5ad049e1
    // 603d2fcd


    function handleIdAccess(event) {
        setIdAcess(event.target.value);
    }

    function handleCloseMessage(event) {
        event.preventDefault();
        setMessage('');
    }

    return (
        <div className="logon__page">
            <form onSubmit={handleSubmitForm} className="content__logon">
                {message &&
                    <p className="message__alert message__error" id="message__alert-error">
                        <span>
                            <strong>Erro! </strong>
                            {message}
                        </span>
                        <button className="btn__message-alert" onClick={handleCloseMessage} >X</button>
                    </p>}
                <label htmlFor="id">ID de acesso</label>
                <div className="id__access">
                    <input
                        type="text"
                        name="id__access"
                        id="ids"
                        value={idAccess}
                        onChange={handleIdAccess}
                    />
                    <button type="submit">Continuar</button>
                </div>
            </form>
            <Link to="/register">Não possui um conta?</Link>
        </div>
    );
}