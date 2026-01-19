import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Indonesia from './pages/Indonesia';
import Programming from './pages/Programming';
import Saved from './components/Saved';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Indonesia />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;