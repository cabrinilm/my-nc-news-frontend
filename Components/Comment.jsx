import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCommentsByArticleId, deleteCommentById } from "../api";
import Loading from "./Loading";
import { FormComment } from "./FormComment";
import { useUser } from "../context/UserAccountProvider";

export const Comment = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCommentId, setDeletingCommentId] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsByArticleId(id);
        setComments(commentsData.comments);
      } catch (error) {
        console.log("Error fetching comments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId); 

    try {
      await deleteCommentById(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      setSuccessMessage("Comment deleted successfully! ✅");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log("Error deleting comment", error);
    } finally {
      setDeletingCommentId(null); 
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="comments-box">
      <h3>Comments</h3>
      <FormComment articleId={id} onAddComment={handleAddComment} />
      {successMessage && <p className="success-message">{successMessage}</p>}
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment-item">
            <p>
              <strong>@{comment.author}</strong>: {comment.body}
            </p>
            {user && comment.author === user.username && (
              <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment.comment_id)}
                disabled={deletingCommentId === comment.comment_id} 
              >
                {deletingCommentId === comment.comment_id ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};
