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
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Hasil Pencarian: "{query}"</h1>

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
