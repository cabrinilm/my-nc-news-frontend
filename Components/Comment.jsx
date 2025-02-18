import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const Comment = () => {
  const { id } = useParams(); 
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://mysocial-513n.onrender.com/api/articles/${id}/comments`
        );
        setComments(response.data.comments); 
      } catch (error) {
        console.log("Error fetching comments", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchComments();
  }, [id]);

  if (loading) return <div>Loading comments...</div>;

  if (comments.length === 0) return <p>No comments yet.</p>; 

  return (
    <div className="comments-box">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-item">
          <p><strong>@{comment.author}</strong>: {comment.body}</p>
        </div>
      ))}
    </div>
  );
};
