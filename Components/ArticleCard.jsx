// ArticleCard.js
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticleById } from "../api"; 
import { Comment } from "./Comment";
import  Loading  from "./Loading"
export const ArticleCard = () => {
  const { id } = useParams(); 

  const [selectArticleById, setSelectArticleById] = useState(null);
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

  if (loading) return <Loading/>
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
        <p className="author-name">by : @{selectArticleById.author}</p>
      </div>
      <Comment /> 
    </div>
  );
};

