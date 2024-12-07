import React, { useEffect, useState } from 'react';
import { fetchNews } from '../services/api';

const Indonesia = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const fetchedNews = await fetchNews(null, 'Indonesia');
      setNews(fetchedNews);
    };
    getNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Berita Terkini dari Indonesia</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            <h2 className="font-bold text-lg mb-2">
              {item.headline.main}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {item.snippet}
            </p>
            <a
              href={item.web_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Baca Selengkapnya
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Indonesia;