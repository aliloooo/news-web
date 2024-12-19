import React, { useState, useEffect } from 'react';

const Saved = () => {
  const [savedNews, setSavedNews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(storedNews);
  }, []);

  const handleRemoveNews = (index) => {
    const updatedNews = [...savedNews];
    updatedNews.splice(index, 1);
    setSavedNews(updatedNews);
    localStorage.setItem('savedNews', JSON.stringify(updatedNews));

    setShowModal(true);
    setTimeout(() => setShowModal(false), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Berita yang Disimpan</h1>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold text-red-500">Deleted</h2>
            <p className="text-sm text-gray-600 mt-2">Berita berhasil dihapus!</p>
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

      {savedNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedNews.map((item, index) => (
            <article
              key={item._id || item.uri}
              className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6"
            >
              <a href={item.web_url}>
                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  {item.headline?.main || 'Tidak ada judul'}
                </h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                {item.snippet || 'Tidak ada deskripsi singkat'}
              </p>

              <button
                onClick={() => window.open(item.web_url, '_blank')}
                className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
              >
                Baca Selengkapnya
              </button>

              <button
                onClick={() => handleRemoveNews(index)}
                className="group mt-4 mx-5 inline-flex items-center gap-1 text-sm font-medium text-red-500"
              >
                Hapus
              </button>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Tidak ada berita yang disimpan.</p>
      )}
    </div>
  );
};

export default Saved;