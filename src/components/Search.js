import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchNews } from '../services/api';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const query = useQuery().get('query');
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savedNews, setSavedNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'save' or 'unsave'

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

    // Fetch saved news from localStorage
    const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(saved);
  }, [query]);

  const handleSaveToggle = (newsItem) => {
    const isAlreadySaved = savedNews.some((item) => item._id === newsItem._id);

    if (isAlreadySaved) {
      // Remove the news item from saved
      const updatedSaved = savedNews.filter((item) => item._id !== newsItem._id);
      setSavedNews(updatedSaved);
      localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
      setModalMessage('Berita berhasil dihapus dari daftar saved!');
      setModalType('unsave');
    } else {
      // Add the news item to saved
      const updatedSaved = [...savedNews, newsItem];
      setSavedNews(updatedSaved);
      localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
      setModalMessage('Berita berhasil disimpan ke daftar saved!');
      setModalType('save');
    }

    // Show modal
    setShowModal(true);
    setTimeout(() => setShowModal(false), 1000); // Auto-close after 1 second
  };

  const isNewsSaved = (newsItem) => {
    return savedNews.some((item) => item._id === newsItem._id);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Hasil Pencarian: "{query}"</h1>

      {/* Modal Alert */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2
              className={`text-xl font-semibold ${
                modalType === 'save' ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {modalType === 'save' ? 'Saved' : 'Deleted'}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{modalMessage}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-600">Memuat berita...</p>
      ) : news.length > 0 ? (
        <ul className="space-y-4">
          {news.map((item) => (
            <li
              key={item._id}
              className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
            >
              <h2 className="font-bold text-lg mb-2">{item.headline.main}</h2>
              <p className="text-gray-600 text-sm mb-2">{item.snippet}</p>
              <a
                href={item.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Baca Selengkapnya
              </a>
              <button
                onClick={() => handleSaveToggle(item)}
                className={`mt-3 mx-5 ${
                  isNewsSaved(item) ? 'text-red-500' : 'text-green-500'
                } hover:underline`}
              >
                {isNewsSaved(item) ? 'Unsave' : 'Save'}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">Tidak ada berita yang ditemukan.</p>
      )}
    </div>
  );
};

export default Search;
