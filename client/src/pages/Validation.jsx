// src/pages/Validations.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Validations() {
    const [validations, setValidations] = useState([]);

    useEffect(() => {
        const fetchValidations = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}` / validations,
                    { headers: { Authorization: Bearer`${token}` } }
                );
                setValidations(res.data);
            } catch (err) {
                console.error('Error al cargar validaciones', err);
            }
        };
        fetchValidations();
    }, []);

    const handleUpdate = async (id, newEstado) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${process.env.REACT_APP_API_URL}` / validations / `${id}`,
                { estado: newEstado },
                { headers: { Authorization: Bearer`${token}` } }
            );
            // refrescar
            setValidations(validations.map(v => v.id === id ? { ...v, estado: newEstado } : v));
            alert(Validación`${newEstado}`);
        } catch (err) {
            console.error('Error al actualizar validación', err);
            alert('No se pudo actualizar validación');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Validaciones de Títulos</h2>
            {validations.length === 0 ? (
                <p>No hay solicitudes de validación.</p>
            ) : (
                validations.map(v => (
                    <div className="card mb-2" key={v.id}>
                        <div className="card-body">
                            <h5 className="card-title">Usuario: {v.usuarios.nombre} {v.usuarios.apellido}</h5>
                            <p className="card-text">Título: {v.titulo}</p>
                            <p className="card-text">Estado: {v.estado}</p>
                            {v.estado === 'pendiente' && (
                                <div>
                                    <button className="btn btn-success me-2" onClick={() => handleUpdate(v.id, 'aprobado')}>Aprobar</button>
                                    <button className="btn btn-danger" onClick={() => handleUpdate(v.id, 'rechazado')}>Rechazar</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Validations;