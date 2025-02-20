// ArticlesCard.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../api";
import Loading from "./Loading";
export const ArticlesCard = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await getArticles(sortBy, order);
        console.log(articlesData.articles)
        setArticles(articlesData.articles || []);
      } catch (error) {
        console.log("Error fetching articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [sortBy, order]);

  if (loading) return <Loading />;

  return (
    <>
      <h2>Articles List</h2>

      
      <div className="sort-controls">
        <select
          className="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Date</option>
         
        </select>

        <select
          className="order"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="articles-container">
        {articles.map((article) => (
          <Link
            to={`/article/${article.article_id}`}
            key={article.article_id}
            className="article-card"
          >
            <img src={article.article_img_url} alt={article.title} />
            <div>
              <p className="author">{article.author}</p>
              <p className="title">{article.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
