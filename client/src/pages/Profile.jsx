// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({
        descripcion: '',
        aptitudes: '',
        experiencia: '',
        educacion: '',
        foto_perfil: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}` / profile,
                    { headers: { Authorization: Bearer`${token}` } }
                );
                setProfile(res.data);
                setForm({
                    descripcion: res.data.descripcion || '',
                    aptitudes: (res.data.aptitudes || []).join(', '),
                    experiencia: res.data.experiencia || '',
                    educacion: res.data.educacion || '',
                    foto_perfil: res.data.foto_perfil || ''
                });
            } catch (err) {
                console.error('Error al cargar perfil', err);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const payload = {
                descripcion: form.descripcion,
                aptitudes: form.aptitudes.split(',').map(s => s.trim()),
                experiencia: form.experiencia,
                educacion: form.educacion,
                foto_perfil: form.foto_perfil
            };
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL} ` / profile,
                payload,
                { headers: { Authorization: Bearer`${token} ` } }
            );
            // Opcional: refrescar perfil
            setProfile(res.data);
            alert('Perfil actualizado');
        } catch (err) {
            console.error('Error al actualizar perfil', err);
            alert('No se pudo actualizar el perfil');
        }
    };

    if (!profile) return <p>Cargando perfil...</p>;

    return (
        <div className="container mt-4">
            <h2>Mi Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="descripcion"
                        className="form-control"
                        value={form.descripcion}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Aptitudes (separadas por coma)</label>
                    <input
                        type="text"
                        name="aptitudes"
                        className="form-control"
                        value={form.aptitudes}
                        onChange={handleChange}
                        placeholder="JavaScript, React, Node.js"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Experiencia</label>
                    <input
                        type="text"
                        name="experiencia"
                        className="form-control"
                        value={form.experiencia}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Educación</label>
                    <input
                        type="text"
                        name="educacion"
                        className="form-control"
                        value={form.educacion}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Foto de perfil (URL)</label>
                    <input
                        type="text"
                        name="foto_perfil"
                        className="form-control"
                        value={form.foto_perfil}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Perfil</button>
            </form>
        </div>
    );
}

export default Profile;