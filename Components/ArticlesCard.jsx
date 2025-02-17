import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ArticlesCard = () => {
  const API_URL = "https://mysocial-513n.onrender.com";
  const [getArticles, setGetArticles] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/articles`);

        setGetArticles(response.data.articles || []);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false)
      }
    };
    fetchArticles();
  }, []);

   if(loading) return <div>Loading...</div>;


  return (
    <>
      <h2>Articles List</h2>
      <div className="articles-container">
        {getArticles.map((article) => (
          <Link
            to={`/article/${article.article_id}`}
            key={article.article_id}
            className="article-card"
          >
            <img src={article.article_img_url} alt={article.title} />
            <div>
              <p className="author">{article.author}</p>
              <p className="title">{article.title}"</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
