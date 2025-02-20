import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById, getCommentsByArticleId, updateArticleVotes } from "../api"; 
import { Comment } from "./Comment";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import  NotFound from "./pages/NotFound"; 

export const ArticleCard = () => {
  const { id } = useParams(); 

  const [selectArticleById, setSelectArticleById] = useState(null);
  const [comments, setComments] = useState([]);  
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); 

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const articleData = await getArticleById(id);
        setSelectArticleById(articleData.articles); 
        setLikes(articleData.articles.votes);
        setError(false); 
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError(true); 
        } else {
          console.log("Error fetching article", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArticleData();
  }, [id]); 

  useEffect(() => {
    if (!error) {
      const fetchComments = async () => {
        try {
          const commentsData = await getCommentsByArticleId(id);
          setComments(commentsData.comments);  
        } catch (error) {
          console.log("Error fetching comments", error);
        }
      };

      if (id) {
        fetchComments();
      }
    }
  }, [id, error]);

  const addLike = async () => {
    try {
      setLikes((prevLikes) => prevLikes + 1); 
      const updatedArticle = await updateArticleVotes(id, 1);
      setLikes(updatedArticle.article.votes); 
    } catch (error) {
      console.error("Error when trying to register vote:", error);
      setLikes((prevLikes) => prevLikes - 1); 
    }
  };

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);  
  };

  if (loading) return <Loading />;
  if (error) return <NotFound />; 

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
        <button className="like-button" onClick={addLike}>
          <FontAwesomeIcon icon={faHeart} />
          <span>{likes}</span>
        </button>
        <p className="author-name">by : @{selectArticleById.author}</p>
      </div>
      
      <Comment 
        comments={comments} 
        articleId={id} 
        onAddComment={handleAddComment} 
      />
    </div>
  );
};
