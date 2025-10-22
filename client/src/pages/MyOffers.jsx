import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useTranslation } from "react-i18next";

const MyOffers = () => {
    const { t } = useTranslation();
    const [offers, setOffers] = useState([]);
    const [form, setForm] = useState({
        titulo: "",
        descripcion: "",
        requisitos: "",
        ubicacion: "",
    });

    const fetchMyOffers = async () => {
        try {
            const res = await api.get("/ofertas/mine");
            setOffers(res.data);
        } catch (error) {
            console.error("Error al cargar mis ofertas:", error);
        }
    };

    useEffect(() => {
        fetchMyOffers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                requisitos: form.requisitos.split(",").map((r) => r.trim()),
            };
            await api.post("/ofertas", payload);
            alert(t("offer_created"));
            setForm({ titulo: "", descripcion: "", requisitos: "", ubicacion: "" });
            fetchMyOffers();
        } catch (error) {
            console.error("Error al crear oferta:", error);

            if (error.response?.status === 400) {
                alert("⚠️ La descripción debe tener al menos 10 caracteres");
            } else {
                alert(t("error_creating_offer"));
            }
        }
    };

    // ✅ Actualizar estado de una postulación
    const handleUpdatePostulation = async (id, estado) => {
        try {
            await api.put(`/postulations/${id}`, { estado });
            fetchMyOffers();
        } catch (error) {
            console.error("Error al actualizar postulación:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">🏢 {t("my_offers")}</h2>

            {/* Formulario de nueva oferta */}
            <div className="card shadow mb-4 border-0">
                <div className="card-header bg-primary text-light">
                    <h4 className="mb-0">➕ {t("create_offer")}</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">{t("title")}</label>
                            <input
                                type="text"
                                name="titulo"
                                value={form.titulo}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("description")}</label>
                            <textarea
                                name="descripcion"
                                value={form.descripcion}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("requirements")}</label>
                            <input
                                type="text"
                                name="requisitos"
                                value={form.requisitos}
                                onChange={handleChange}
                                placeholder={t("requirements_placeholder")}
                                className="form-control"
                                required
                            />
                            <small className="text-muted">
                                {t("requirements_hint", "Separar con comas: React, Node.js, SQL")}
                            </small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">{t("location")}</label>
                            <input
                                type="text"
                                name="ubicacion"
                                value={form.ubicacion}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            🚀 {t("create_offer")}
                        </button>
                    </form>
                </div>
            </div>

            {/* Listado de ofertas */}
            <div className="card shadow border-0">
                <div className="card-header bg-dark text-light">
                    <h4 className="mb-0">📋 {t("my_offers")}</h4>
                </div>
                <div className="card-body">
                    {offers.length === 0 ? (
                        <p>{t("no_offers_created")}</p>
                    ) : (
                        offers.map((offer) => (
                            <div key={offer.id} className="mb-4 border-bottom pb-3">
                                <h5>📌 {offer.titulo}</h5>
                                <p>{offer.descripcion}</p>
                                <p>
                                    <b>{t("location")}:</b> {offer.ubicacion}
                                </p>
                                <p>
                                    <b>{t("requirements")}:</b> {offer.requisitos?.join(", ")}
                                </p>

                                <h6>📨 {t("applications_received", "Postulaciones recibidas:")}</h6>
                                {offer.postulaciones && offer.postulaciones.length > 0 ? (
                                    <table className="table table-sm table-hover align-middle">
                                        <thead>
                                            <tr>
                                                <th>{t("student")}</th>
                                                <th>{t("status")}</th>
                                                <th>{t("actions")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {offer.postulaciones.map((p) => (
                                                <tr key={p.id}>
                                                    <td>
                                                        {p.usuarios?.nombre} {p.usuarios?.apellido}
                                                    </td>
                                                    <td>{p.estado}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() => handleUpdatePostulation(p.id, "aprobado")}
                                                            disabled={p.estado === "aprobado"}
                                                        >
                                                            ✅ {t("approve")}
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleUpdatePostulation(p.id, "rechazado")}
                                                            disabled={p.estado === "rechazado"}
                                                        >
                                                            ❌ {t("reject")}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-muted">
                                        {t("no_applications_received", "Aún no recibiste postulaciones.")}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOffers;
