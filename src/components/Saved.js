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