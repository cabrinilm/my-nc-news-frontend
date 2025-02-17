import axios from "axios";
import { useEffect, useState } from "react";


export const ArticlesCard = () => {
  const API_URL = 'https://mysocial-513n.onrender.com';
  const [getArticles, setGetArticles] = useState([]); 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/articles`);
        console.log(response.data.articles); 
        setGetArticles(response.data.articles || []); 
      } catch (error) {
        console.log('Error', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      <h2>Articles List</h2>
      <div className="articles-container">
        {getArticles.map((article) => (
          <div key={article.article_id} className="article-card">
            <img src={article.article_img_url} alt={article.title} />
            <div>
              <p className="author">{article.author}</p>
              <p className="title">{article.title}"</p>
            </div>
          </div>
        ))}
      </div>
  
    </>
  );
};
