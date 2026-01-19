import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { getTheme, themes } from '../utils/theme';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine current theme based on path
  const currentPath = location.pathname;
  let activeTheme = themes.default;
  if (currentPath === '/') activeTheme = themes.indonesia;
  else if (currentPath === '/programming') activeTheme = themes.programming;

  const isDark = activeTheme.name === 'programming';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`);
      setIsOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Retro styled NavLink
  const NavLink = ({ to, children }) => {
    const active = isActive(to);
    // Base retro classes
    let classes = "uppercase tracking-widest px-4 py-2 text-sm font-bold transition-all duration-300 border-2 ";

    if (active) {
      // Active state: Solid fill with contrasting text
      if (to === '/') classes += "bg-vintage-red text-white border-vintage-ink shadow-retro-red transform -translate-y-1";
      else if (to === '/programming') classes += "bg-vintage-teal text-white border-vintage-ink shadow-retro-hover transform -translate-y-1";
      else classes += "bg-vintage-mustard text-vintage-ink border-vintage-ink shadow-retro";
    } else {
      // Inactive state: Transparent with vintage ink text, subtle hover
      classes += "border-transparent text-vintage-ink hover:underline decoration-2 underline-offset-4 hover:bg-vintage-mustard/20";
    }

    return (
      <Link to={to} className={classes} onClick={() => setIsOpen(false)}>
        {children}
      </Link>
    );
  };

  return (
    <nav
      className={`sticky top-0 w-full z-40 transition-all duration-300 border-b-4 ${scrolled ? 'border-vintage-ink bg-vintage-cream/95 backdrop-blur-sm' : 'border-vintage-ink bg-vintage-cream'} py-2`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Masthead Style */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="bg-vintage-ink text-vintage-cream p-1 font-headline font-black text-2xl tracking-tighter border-2 border-transparent group-hover:bg-vintage-red group-hover:text-white transition-colors">
                AN
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-black text-3xl tracking-tight text-vintage-ink leading-none uppercase">AetherNews</span>
                <span className="text-xs font-serif italic text-vintage-teal tracking-widest">Est. 2026</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <div className="flex items-center space-x-4">
              <NavLink to="/">Indonesia</NavLink>
              <NavLink to="/programming">Programming</NavLink>
              <NavLink to="/saved">Saved</NavLink>
            </div>

            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="SEARCH ARCHIVES..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 pl-2 pr-8 py-1 bg-transparent border-b-2 border-vintage-ink text-vintage-ink font-mono text-sm focus:outline-none focus:border-vintage-red placeholder-vintage-ink/50 transition-all"
              />
              <button type="submit" className="absolute right-0 top-1 text-vintage-ink group-hover:text-vintage-red transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-vintage-ink hover:text-vintage-red focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-vintage-cream border-t-4 border-vintage-ink absolute w-full shadow-retro`}>
        <div className="px-4 py-6 space-y-3 sm:px-3 flex flex-col items-center">
          <NavLink to="/">Indonesia</NavLink>
          <NavLink to="/programming">Programming</NavLink>
          <NavLink to="/saved">Saved</NavLink>

          <form onSubmit={handleSearch} className="relative mt-6 w-full max-w-xs border-2 border-vintage-ink p-2 bg-white">
            <input
              type="text"
              placeholder="SEARCH ARCHIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-vintage-ink font-mono text-sm focus:ring-0"
            />
            <button type="submit" className="absolute right-2 top-2">
              <svg className="h-5 w-5 text-vintage-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;