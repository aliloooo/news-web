import React from 'react';
import CategoryPage from '../components/CategoryPage';

const Programming = () => {
  return (
    <CategoryPage
      title="Programming News"
      subtitle="Tech, coding, and development updates"
      query="Programming"
      themeKey="programming"
    />
  );
};

export default Programming;