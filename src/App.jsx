import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// component
import Product from './pages/Product';
import Homepage from './pages/Homepage';
import Pricing from './pages/Pricing';
import Login from './pages/Login';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
