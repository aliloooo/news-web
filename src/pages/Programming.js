import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../store/newsSlice';

const Programming = () => {
  const dispatch = useDispatch();
  const { news, isLoading, error } = useSelector((state) => state.news);
  const [savedNews, setSavedNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    dispatch(fetchNewsData('Programming'));
    const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(saved);
  }, [dispatch]);

  const handleSaveToggle = (newsItem) => {
    const isAlreadySaved = savedNews.some((item) => item._id === newsItem._id);

    if (isAlreadySaved) {
      const updatedSaved = savedNews.filter((item) => item._id !== newsItem._id);
      setSavedNews(updatedSaved);
      localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
      setModalMessage('Berita berhasil dihapus!');
      setModalType('unsave');
    } else {
      const updatedSaved = [...savedNews, newsItem];
      setSavedNews(updatedSaved);
      localStorage.setItem('savedNews', JSON.stringify(updatedSaved));
      setModalMessage('Berita berhasil disimpan!');
      setModalType('save');
    }

    setShowModal(true);
    setTimeout(() => setShowModal(false), 1000);
  };

  const isNewsSaved = (newsItem) => {
    return savedNews.some((item) => item._id === newsItem._id);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Berita Seputar Programming</h1>

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
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <article
              key={item._id || item.uri}
              className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
            >
              <a href={item.web_url} target="_blank" rel="noopener noreferrer">
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  {item.headline?.main || 'Tidak ada judul'}
                </h3>
              </a>
              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {item.snippet || 'Tidak ada deskripsi singkat'}
              </p>
              <a
                href={item.web_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
              >
                Baca Selengkapnya
              </a>
              <button
                onClick={() => handleSaveToggle(item)}
                className={`group mt-4 mx-5 inline-flex items-center gap-1 text-sm font-medium ${
                  isNewsSaved(item) ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {isNewsSaved(item) ? 'Unsave' : 'Save'}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Tidak ada berita yang ditemukan.</p>
      )}
    </div>
  );
};

export default Programming;