import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-10">
        <div className="container-main">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
