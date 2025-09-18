// src/components/ApplicationCard.jsx
import React from 'react';

function ApplicationCard({ application }) {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">Oferta: {application.ofertaslaborales?.titulo || 'Sin título'}</h5>
                <p className="card-text">{application.mensaje || 'No se envió mensaje'}</p>
                <p className="card-text">
                    <small className="text-muted">Estado: {application.estado || 'pendiente'}</small>
                </p>
            </div>
        </div>
    );
}

export default ApplicationCard;