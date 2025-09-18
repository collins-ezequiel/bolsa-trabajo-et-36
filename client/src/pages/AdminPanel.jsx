// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';

function AdminPanel() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL} ` / usuarios,  // Asumir que existe endpoint /usuarios
                    {
                        headers: { Authorization: Bearer`${token}` }
                    }
                );
                setUsers(res.data);
            } catch (err) {
                console.error('Error al cargar usuarios', err);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Panel de Administración</h2>
            {users.length === 0 ? (
                <p>No se encontraron usuarios.</p>
            ) : (
                users.map(u => <UserCard key={u.id} user={u} />)
            )}
        </div>
    );
}

export default AdminPanel;