import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticles } from "../../api";
import Loading from "../Loading";

export function ArticlesByTopic() {
  const { topic_name } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles();
        const filteredArticles = response.articles.filter(
          (article) => article.topic === topic_name
        );
      
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching articles", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [topic_name]);

  if (loading) return <Loading />;
  return (
    <div>
      <h2>Items in the category: {topic_name}</h2>
      <div className="articles-container">
        {articles.map((item) => (
          <Link
            to={`/article/${item.article_id}`}
            key={item.article_id}
            className="article-card"
          >
            <div key={item.article_id} className="article-card">
              <img src={item.article_img_url} alt={item.author} />
              <p className="author">{item.author}</p>
              <p className="title">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
