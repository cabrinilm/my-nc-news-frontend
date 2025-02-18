import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Comment } from "./Comment";
export const ArticleCard = () => {
  const { id } = useParams();
 
  const [selectArticleById, setSelectArticleById] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticleById = async () => {
      try {
        const response = await axios.get(
          `https://mysocial-513n.onrender.com/api/articles/${id}`
        );
        setSelectArticleById(response.data.articles);
        
      } catch (error) {
        console.log("Error fetching article", error);
      } finally {
        setLoading(false)
      }
    };
    fetchArticleById();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="article-page">
      <Link to="/" className="back-link">
        Back to Articles List
      </Link>
      <div className="article-box">
        <h1 className="article-title">{selectArticleById.title}</h1>
        <div className="article-body">
          <p>{selectArticleById.body}</p>
        </div>
        <p className="author-name">by : @{selectArticleById.author}</p>
      </div>
      <Comment />
    </div>
  );
};
