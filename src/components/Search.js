import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchNews } from '../services/api';
import NewsCard from '../components/NewsCard';
import NewsGrid from '../components/NewsGrid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Toast from '../components/Toast';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = useQuery().get('query');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedNews, setSavedNews] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const searchNews = async () => {
      if (query) {
        setIsLoading(true);
        const fetchedNews = await fetchNews(query);
        setNews(fetchedNews);
        setIsLoading(false);
      }
    };
    searchNews();

    const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(saved);
  }, [query]);

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
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        <p className="mt-2 text-gray-500">Showing results for "{query}"</p>
      </div>

      <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />

      {isLoading ? (
        <NewsGrid>
          {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
        </NewsGrid>
      ) : news.length > 0 ? (
        <NewsGrid>
          {news.map((item) => (
            <NewsCard
              key={item._id}
              article={item}
              isSaved={isNewsSaved(item)}
              onToggleSave={handleSaveToggle}
            />
          ))}
        </NewsGrid>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news found for "{query}".</p>
        </div>
      )}
    </div>
  );
};

export default Search;
