import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getArticles, getTopics } from "../../api";
import Loading from "../Loading";

export function ArticlesByTopic() {
  const { topic_name } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validTopic, setValidTopic] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topicsResponse = await getTopics();
        const topicExists = topicsResponse.some((topic) => topic.slug === topic_name);

        if (!topicExists) {
          setValidTopic(false);
          return;
        }

        const articlesResponse = await getArticles();
        const filteredArticles = articlesResponse.articles.filter(
          (article) => article.topic === topic_name
        );
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error fetching data", error);
        setValidTopic(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topic_name]);

  if (loading) return <Loading />;
  
  if (!validTopic) {
    return navigate("/not-found");
  }

  return (
    <div>
      <h2>Items in the category: {topic_name}</h2>
      <div className="articles-container">
        {articles.length === 0 ? (
          <p>No articles found.</p>
        ) : (
          articles.map((item) => (
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
          ))
        )}
      </div>
    </div>
  );
}
