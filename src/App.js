import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Indonesia from './pages/Indonesia';
import Programming from './pages/Programming';
import Saved from './components/Saved';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Indonesia />} />
      <Route path="/programming" element={<Programming />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Router>
);

export default App;
