import React from 'react';

const NewsCard = ({ article, isSaved, onToggleSave, theme }) => {
    // Fallback defaults if theme is missing
    const t = theme || {
        cardBg: 'bg-white',
        cardBorder: 'border-gray-100',
        textMain: 'text-gray-900',
        cardText: 'text-gray-500',
        btnPrimary: 'text-blue-600',
        hoverShadow: 'hover:shadow-lg'
    };

    return (
        <article className={`group relative flex flex-col justify-between rounded-xl border ${t.cardBorder} ${t.cardBg} p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
            <div>
                <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
                    <h3 className={`text-xl font-bold ${t.textMain} group-hover:opacity-80 transition-opacity line-clamp-2`}>
                        {article.headline?.main || 'No Title Available'}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${t.cardText} line-clamp-3`}>
                        {article.snippet || 'No description available for this article.'}
                    </p>
                </a>
            </div>

            <div className={`mt-6 flex items-center justify-between border-t ${t.name === 'programming' ? 'border-slate-700' : 'border-gray-50'} pt-4`}>
                <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${t.btnPrimary}`}
                >
                    Read Article
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>

                <button
                    onClick={() => onToggleSave(article)}
                    className={`rounded-full p-2 transition-colors duration-200 ${isSaved
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : `${t.name === 'programming' ? 'hover:bg-slate-700 text-slate-500' : 'hover:bg-gray-100 text-gray-500'}`
                        }`}
                    aria-label={isSaved ? 'Unsave article' : 'Save article'}
                >
                    {isSaved ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    )}
                </button>
            </div>
        </article>
    );
};

export default NewsCard;
