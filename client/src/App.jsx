
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import Validations from './pages/Validations';
import Postulations from './pages/Postulations';
import AdminPanel from './pages/AdminPanel';
import 'bootswatch/dist/slate/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/validations" element={<Validations />} />
                    <Route path="/postulations" element={<Postulations />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;