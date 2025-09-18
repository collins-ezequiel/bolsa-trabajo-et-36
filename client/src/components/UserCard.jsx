// src/components/UserCard.jsx
import React from 'react';

function UserCard({ user }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{user.nombre} {user.apellido}</h5>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Rol: {user.rol}</p>
                <p className="card-text">Título validado: {user.titulo_validado ? 'Sí' : 'No'}</p>
            </div>
        </div>
    );
}

export default UserCard;