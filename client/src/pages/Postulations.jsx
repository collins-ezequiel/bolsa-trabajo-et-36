// src/pages/Postulations.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicationCard from '../components/ApplicationCard';

function Postulations() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchPostulations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}` / postulations,
                    {
                        headers: { Authorization: Bearer`${token}` }
                    }
                );
                setApplications(res.data);
            } catch (err) {
                console.error('Error al cargar postulaciones', err);
            }
        };
        fetchPostulations();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Mis Postulaciones</h2>
            {applications.length === 0 ? (
                <p>No hay postulaciones aún.</p>
            ) : (
                applications.map(app => <ApplicationCard key={app.id} application={app} />)
            )}
        </div>
    );
}

export default Postulations;