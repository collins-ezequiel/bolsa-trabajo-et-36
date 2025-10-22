import React, { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import ValidationForm from "../components/ValidationForm";
import { toast } from "react-toastify";

const Profile = () => {
    const { t } = useTranslation();
    const { token } = useContext(AuthContext);

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [validations, setValidations] = useState([]);

    // Campos editables
    const [descripcion, setDescripcion] = useState("");
    const [aptitudes, setAptitudes] = useState([]);
    const [experiencia, setExperiencia] = useState([]);
    const [educacion, setEducacion] = useState([]);

    // Obtener perfil
    const fetchProfile = async () => {
        try {
            const res = await api.get("/profiles", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(res.data);

            setDescripcion(res.data.descripcion || "");
            setAptitudes(Array.isArray(res.data.aptitudes) ? res.data.aptitudes : []);
            setExperiencia(Array.isArray(res.data.experiencia) ? res.data.experiencia : []);
            setEducacion(Array.isArray(res.data.educacion) ? res.data.educacion : []);
        } catch (err) {
            console.warn("No se encontró perfil:", err);
        } finally {
            setLoading(false);
        }
    };

    // Obtener validaciones propias
    const fetchValidations = async () => {
        try {
            const res = await api.get("/validations/mine", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setValidations(res.data);
        } catch (err) {
            console.error("Error cargando validaciones:", err);
        }
    };

    useEffect(() => {
        if (token) {
            fetchProfile();
            fetchValidations();
        }
    }, [token]);

    // Guardar perfil
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                descripcion: descripcion || "",
                aptitudes: Array.isArray(aptitudes) ? aptitudes.filter((a) => a.trim() !== "") : [],
                experiencia: Array.isArray(experiencia) ? experiencia.filter((e) => e.trim() !== "") : [],
                educacion: Array.isArray(educacion) ? educacion.filter((e) => e.trim() !== "") : [],
                foto_perfil: null,
            };

            if (profile) {
                await api.put("/profiles", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success(t("profile_updated", "Perfil actualizado"));
            } else {
                await api.post("/profiles", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success(t("profile_created", "Perfil creado"));
            }

            fetchProfile();
        } catch (err) {
            console.error("Error al guardar perfil:", err.response?.data || err.message);
            toast.error(t("profile_error", "Error al guardar perfil"));
        }
    };

    if (loading) return <p>{t("loading", "Cargando...")}</p>;

    return (
        <div className="container py-4">
            <h1 className="text-center mb-4">👤 {t("profile")}</h1>

            {/* Info del perfil */}
            <div className="card shadow mb-4 border-0">
                <div className="card-header bg-info text-light">
                    <h4 className="mb-0">📌 {t("profile_information", "Información del perfil")}</h4>
                </div>
                <div className="card-body">
                    {profile ? (
                        <>
                            <p>
                                <b>{t("name")}:</b> {profile.usuarios.nombre} {profile.usuarios.apellido}
                            </p>
                            <p><b>{t("email")}:</b> {profile.usuarios.email}</p>
                            <p><b>{t("role")}:</b> {profile.usuarios.rol}</p>
                            <p><b>{t("description")}:</b> {profile.descripcion || t("no_description", "Sin descripción")}</p>
                        </>
                    ) : (
                        <p>{t("no_profile", "No tienes un perfil creado, completa el formulario abajo.")}</p>
                    )}
                </div>
            </div>

            {/* Formulario editar perfil */}
            <div className="card shadow mb-4 border-0">
                <div className="card-header bg-primary text-light">
                    <h4 className="mb-0">✏️ {profile ? t("update", "Actualizar") : t("create", "Crear")} {t("profile")}</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Descripción */}
                        <div className="mb-3">
                            <label>{t("description", "Descripción")}</label>
                            <textarea
                                className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            />
                        </div>

                        {/* Aptitudes dinámicas */}
                        <div className="mb-3">
                            <label>{t("skills", "Habilidades")}</label>
                            {aptitudes.map((skill, idx) => (
                                <div key={idx} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={skill}
                                        onChange={(e) => {
                                            const updated = [...aptitudes];
                                            updated[idx] = e.target.value;
                                            setAptitudes(updated);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        onClick={() => setAptitudes(aptitudes.filter((_, i) => i !== idx))}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setAptitudes([...aptitudes, ""])}
                            >
                                ➕ {t("add_skill", "Agregar habilidad")}
                            </button>
                        </div>

                        {/* Experiencia dinámica */}
                        <div className="mb-3">
                            <label>{t("experience", "Experiencia")}</label>
                            {experiencia.map((exp, idx) => (
                                <div key={idx} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={exp}
                                        onChange={(e) => {
                                            const updated = [...experiencia];
                                            updated[idx] = e.target.value;
                                            setExperiencia(updated);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        onClick={() => setExperiencia(experiencia.filter((_, i) => i !== idx))}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setExperiencia([...experiencia, ""])}
                            >
                                ➕ {t("add_experience", "Agregar experiencia")}
                            </button>
                        </div>

                        {/* Educación dinámica */}
                        <div className="mb-3">
                            <label>{t("education", "Educación")}</label>
                            {educacion.map((edu, idx) => (
                                <div key={idx} className="d-flex mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={edu}
                                        onChange={(e) => {
                                            const updated = [...educacion];
                                            updated[idx] = e.target.value;
                                            setEducacion(updated);
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        onClick={() => setEducacion(educacion.filter((_, i) => i !== idx))}
                                    >
                                        ❌
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setEducacion([...educacion, ""])}
                            >
                                ➕ {t("add_education", "Agregar educación")}
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            💾 {profile ? t("update", "Actualizar") : t("create", "Crear")}
                        </button>
                    </form>
                </div>
            </div>

            {/* Validaciones */}
            <div className="card shadow border-0">
                <div className="card-header bg-warning">
                    <h4 className="mb-0">✅ {t("validations", "Validaciones")}</h4>
                </div>
                <div className="card-body">
                    <ValidationForm />
                    {validations.length === 0 ? (
                        <p>{t("no_validations", "No tienes validaciones aún.")}</p>
                    ) : (
                        <ul className="list-group">
                            {validations.map((v) => (
                                <li key={v.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{v.titulo}</span>
                                    <span>
                                        {v.estado === "aprobado" && "✅"}
                                        {v.estado === "rechazado" && "❌"}
                                        {v.estado === "pendiente" && "⏳"} {t(v.estado, v.estado)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
