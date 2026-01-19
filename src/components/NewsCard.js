import React from 'react';

const NewsCard = ({ article, isSaved, onToggleSave }) => {
    return (
        <article className="group relative flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1">
            <div>
                <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="block focus:outline-none">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {article.headline?.main || 'No Title Available'}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-500 line-clamp-3">
                        {article.snippet || 'No description available for this article.'}
                    </p>
                </a>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                <a
                    href={article.web_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
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
                    className={`rounded-full p-2 transition-colors ${isSaved
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600'
                        }`}
                    aria-label={isSaved ? 'Unsave article' : 'Save article'}
                    title={isSaved ? 'Remove from Saved' : 'Save for later'}
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
