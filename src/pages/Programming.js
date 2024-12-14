import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';

const Programming = () => {
  const [news, setNews] = useState([]); // Menyimpan data berita
  const [isLoading, setIsLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menyimpan error
  const [showModal, setShowModal] = useState(false); // Status modal success

  useEffect(() => {
    const getNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const fetchedNews = await fetchNews('Programming');
        if (fetchedNews) {
          setNews(fetchedNews);
        } else {
          setError('Tidak ada data berita yang tersedia.');
        }
      } catch (err) {
        setError('Gagal memuat berita. Silakan coba lagi.');
        console.error('Error fetching news:', err);
      } finally {
        setIsLoading(false);
      }
    };

    getNews();
  }, []);

  const handleSaveNews = (newsItem) => {
    const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
    const isAlreadySaved = saved.some((item) => item._id === newsItem._id);

    if (!isAlreadySaved) {
      const updatedSaved = [...saved, newsItem];
      localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
      setShowModal(true); // Tampilkan modal success
      setTimeout(() => setShowModal(false), 1000);
    } else {
      alert('Berita ini sudah ada di daftar saved!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Berita Seputar Programming</h1>

      {/* Modal Success */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <div className="flex items-center justify-center w-12 bg-emerald-500 rounded-full mb-4">
              <svg
                className="w-6 h-6 text-white fill-current"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-emerald-500">Success</h2>
            <p className="text-sm text-gray-600 mt-2">Berita berhasil disimpan!</p>
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
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div
              key={item._id || item.uri}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h2 className="font-bold text-lg mb-2">
                {item.headline?.main || 'Tidak ada judul'}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {item.snippet || 'Tidak ada deskripsi singkat'}
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(item.web_url, '_blank')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                >
                  Baca Selengkapnya
                </button>
                <button
                  onClick={() => handleSaveNews(item)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Tidak ada berita yang ditemukan.</p>
      )}
    </div>
  );
};

export default Programming;