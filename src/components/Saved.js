import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import NewsGrid from '../components/NewsGrid';
import Toast from '../components/Toast';

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

  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-gray-900">Saved Articles</h1>
        <p className="mt-2 text-gray-500">Your collection of bookmarked news</p>
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
            />
          ))}
        </NewsGrid>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No saved articles</h3>
          <p className="mt-1 text-sm text-gray-500">Start reading and bookmark news to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default Saved;