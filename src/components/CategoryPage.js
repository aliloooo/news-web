import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../store/newsSlice';
import NewsCard from './NewsCard';
import NewsGrid from './NewsGrid';
import LoadingSkeleton from './LoadingSkeleton';
import Toast from './Toast';
import { getTheme } from '../utils/theme';

const CategoryPage = ({ query, title, subtitle, themeKey }) => {
    const dispatch = useDispatch();
    const { news, isLoading, error } = useSelector((state) => state.news);
    const [savedNews, setSavedNews] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '' });

    const theme = getTheme(themeKey);

    useEffect(() => {
        dispatch(fetchNewsData(query));
        const saved = JSON.parse(localStorage.getItem('savedNews')) || [];
        setSavedNews(saved);
    }, [dispatch, query]);

    // Effect to change body background color based on theme
    useEffect(() => {
        // Always use vintage-cream for retro theme, but we can subtly shift if needed.
        // For now, keeping it consistent #FDFBF7 per requirements.
        document.body.style.backgroundColor = '#FDFBF7';

        // Cleanup
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [themeKey]);


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
        <div className={`transition-colors duration-500 min-h-screen`}>
            <div className={`mb-8 ${theme.layoutBorder || 'border-b-4 border-vintage-ink'} pb-5`}>
                <h1 className={`text-5xl font-black uppercase tracking-tighter ${theme.textMain}`}>{title}</h1>
                <p className={`mt-2 font-serif italic text-lg text-vintage-ink opacity-75`}>{subtitle}</p>
            </div>

            <Toast message={toast.message} type={toast.type} onClose={handleCloseToast} />

            {isLoading ? (
                <NewsGrid>
                    {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} theme={theme} />)}
                </NewsGrid>
            ) : error ? (
                <div className={`rounded-none border-2 border-vintage-ink bg-vintage-red/10 p-4 text-center text-vintage-red font-bold`}>
                    <p>Error: {error}</p>
                </div>
            ) : news.length > 0 ? (
                <NewsGrid>
                    {news.map((item) => (
                        <NewsCard
                            key={item._id || item.uri}
                            article={item}
                            isSaved={isNewsSaved(item)}
                            onToggleSave={handleSaveToggle}
                            theme={theme}
                        />
                    ))}
                </NewsGrid>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-vintage-ink bg-white">
                    <p className="text-xl font-serif italic">Extra! Extra! No news found here.</p>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
