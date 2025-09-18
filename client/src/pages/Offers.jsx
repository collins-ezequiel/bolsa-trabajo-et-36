import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OfferCard from '../components/OfferCard';

function Offers() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/search/ofertas`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setOffers(res.data);
            } catch (err) {
                console.error('Error al cargar ofertas', err);
            }
        };

        fetchOffers();
    }, []);

    return (
        <div className="container mt-4">
            <h2>Ofertas</h2>
            {offers.length === 0 ? (
                <p>No se encontraron ofertas</p>
            ) : (
                offers.map((o) => (
                    <OfferCard key={o.id} offer={o} />
                ))
            )}
        </div>
    );
}

export default Offers;