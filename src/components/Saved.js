import React, { useState, useEffect } from 'react';

const Saved = () => {
  const [savedNews, setSavedNews] = useState([]);

  // Mengambil berita dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem('savedNews')) || [];
    setSavedNews(storedNews);
  }, []);

  const handleRemoveNews = (index) => {
    const updatedNews = [...savedNews];
    updatedNews.splice(index, 1); // Hapus berita berdasarkan indeks
    setSavedNews(updatedNews); // Update state
    localStorage.setItem('savedNews', JSON.stringify(updatedNews)); // Update localStorage
    alert('Berita berhasil dihapus dari daftar saved!');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Berita yang Disimpan</h1>

      {savedNews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedNews.map((item, index) => (
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
                onClick={() => handleRemoveNews(index)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Hapus
              </button>
            </div>
          </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Tidak ada berita yang disimpan.</p>
      )}
    </div>
  );
};

export default Saved;