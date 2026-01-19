import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import NewsGrid from '../components/NewsGrid';
import Toast from '../components/Toast';
import { themes } from '../utils/theme';

const Saved = () => {
  const [savedNews, setSavedNews] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(storedNews);
  }, []);

  const handleSaveToggle = (newsItem) => {
    // In Saved page, toggling always means removing
    const updatedNews = savedNews.filter((item) => item._id !== newsItem._id);
    setSavedNews(updatedNews);
    localStorage.setItem('savedNews', JSON.stringify(updatedNews));
    setToast({ message: 'Article removed from Saved', type: 'unsave' });
  };

  const handleCloseToast = () => setToast({ message: '', type: '' });

  const theme = themes.default;

  return (
    <div className="min-h-screen">
      <div className="mb-8 border-b-4 border-vintage-ink pb-5">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-vintage-ink">Saved Articles</h1>
        <p className="mt-2 font-serif italic text-lg text-vintage-ink opacity-75">Your collection of bookmarked news</p>
      </div>

      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />

      {savedNews.length > 0 ? (
        <NewsGrid>
          {savedNews.map((item) => (
            <NewsCard
              key={item._id || item.uri}
              article={item}
              isSaved={true}
              onToggleSave={handleSaveToggle}
              theme={theme}
            />
          ))}
        </NewsGrid>
      ) : (
        <div className="text-center py-20 bg-vintage-paper rounded-xl border-4 border-double border-vintage-ink">
          <svg className="mx-auto h-12 w-12 text-vintage-ink/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-xl font-headline font-bold text-vintage-ink">Archives Empty</h3>
          <p className="mt-1 text-sm font-serif italic text-vintage-ink/70">Start reading and bookmark news to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;