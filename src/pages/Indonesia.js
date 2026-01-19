import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../store/newsSlice';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../store/newsSlice';
import NewsCard from '../components/NewsCard';
import NewsGrid from '../components/NewsGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';

const Indonesia = () => {
  const dispatch = useDispatch();
  const { news, isLoading, error } = useSelector((state) => state.news);
  const [savedNews, setSavedNews] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    dispatch(fetchNewsData('Indonesia'));
    const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(saved);
  }, [dispatch]);

  const handleSaveToggle = (newsItem) => {
    const isAlreadySaved = savedNews.some((item) => item._id === newsItem._id);
    let updatedSaved;
    let message;
    let type;

    if (isAlreadySaved) {
      updatedSaved = savedNews.filter((item) => item._id !== newsItem._id);
      message = 'Article removed from Saved';
      type = 'unsave';
    } else {
      updatedSaved = [...savedNews, newsItem];
      message = 'Article saved successfully';
      type = 'save';
    }

    setSavedNews(updatedSaved);
    localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
    setToast({ message, type });
  };

  const isNewsSaved = (newsItem) => {
    return savedNews.some((item) => item._id === newsItem._id);
  };

  const handleCloseToast = () => setToast({ message: '', type: '' });

  return (
    <div>
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-gray-900">Indonesia News</h1>
        <p className="mt-2 text-gray-500">Latest updates and stories from Indonesia</p>
      </div>

      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />

      {isLoading ? (
        <NewsGrid>
          {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
        </NewsGrid>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600 font-medium">Error: {error}</p>
        </div>
      ) : news.length > 0 ? (
        <NewsGrid>
          {news.map((item) => (
            <NewsCard
              key={item._id || item.uri}
              article={item}
              isSaved={isNewsSaved(item)}
              onToggleSave={handleSaveToggle}
            />
          ))}
        </NewsGrid>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news found.</p>
        </div>
      )}
    </div>
  );
};

export default Indonesia;