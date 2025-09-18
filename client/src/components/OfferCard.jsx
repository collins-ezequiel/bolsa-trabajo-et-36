import React from 'react';

function OfferCard({ offer }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{offer.titulo}</h5>
        <p className="card-text">{offer.descripcion}</p>
        <p className="card-text"><small className="text-muted">Requisitos: {offer.requisitos.join(', ')}</small></p>
      </div>
    </div>
  );
}

export default OfferCard;