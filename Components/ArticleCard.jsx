import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, updateArticleVotes } from "../api"; 
import { Comment } from "./Comment";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const ArticleCard = () => {
  const { id } = useParams(); 

  const [selectArticleById, setSelectArticleById] = useState(null);
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const articleData = await getArticleById(id);
        setSelectArticleById(articleData.articles); 
      } catch (error) {
        console.log("Error fetching article", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]); 

  useEffect(() => {
    if (selectArticleById) {
      setLikes(selectArticleById.votes); 
    }
  }, [selectArticleById]);

  const addLike = async () => {
    try {
      setLikes((prevLikes) => prevLikes + 1); 
      const updatedArticle = await updateArticleVotes(id, 1);
      setLikes(updatedArticle.article.votes); 
    } catch (error) {
      console.error("Error when trying register vote:", error);
      setLikes((prevLikes) => prevLikes - 1); 
    }
  };

  if (loading) return <Loading />;
  
  return (
    <div className="article-page">
      <Link to="/" className="back-link">
        Back to Articles List
      </Link>
      <div className="article-box">
        <h1 className="article-title">{selectArticleById.title}</h1>
        <div className="article-body">
          <p id="articlebody">{selectArticleById.body}</p>
        </div>
        <button onClick={addLike}>
          <FontAwesomeIcon icon={faHeart} />
          <span>{likes}</span>
        </button>
        <p className="author-name">by : @{selectArticleById.author}</p>
      </div>
      <Comment /> 
    </div>
  );
};

