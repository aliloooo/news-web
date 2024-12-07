import axios from 'axios';

const API_KEY = 'iKhaPh28Aed0AudfmWAitssX9U8lnucq';
const BASE_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

export const fetchNews = async (query = null, location = null) => {
  try {
    let params = {
      'api-key': API_KEY,
    };

    if (query) {
      params.q = query;
    }

    if (location) {
      params.fq = `glocations:("${location}")`;
    }

    const response = await axios.get(BASE_URL, { params });

    const articles = response.data.response.docs;

    return articles.map((article) => ({
      _id: article._id,
      headline: article.headline,
      snippet: article.snippet,
      web_url: article.web_url,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
