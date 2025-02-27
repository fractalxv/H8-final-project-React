import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DrugProvider } from './context/DrugContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Regist from './pages/Regist';
import CartPage from './pages/CartPage';
import DrugDetail from './components/DrugDetail';

function App() {
  return (
    <DrugProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Regist />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/drug/:id"
                element={
                  <ProtectedRoute>
                    <DrugDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Layout>
        </div>
      </Router>
    </DrugProvider>
  );
}

export default App;