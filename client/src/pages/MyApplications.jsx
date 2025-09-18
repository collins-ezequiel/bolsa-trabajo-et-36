// src/pages/MyApplications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicationCard from '../components/ApplicationCard';

function MyApplications() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}` / postulaciones,
                    { headers: { Authorization: Bearer`${token} ` } }
                );
                setApplications(res.data);
            } catch (err) {
                console.error('Error al cargar postulaciones', err);
            }
        };
        fetchApps();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Mis Postulaciones</h2>
            {applications.length === 0 ? (
                <p>No tienes postulaciones todavía.</p>
            ) : (
                applications.map(app => <ApplicationCard key={app.id} app={app} />)
            )}
        </div>
    );
}

export default MyApplications;