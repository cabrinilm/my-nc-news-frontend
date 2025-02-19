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
    try {
      await deleteCommentById(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
    } catch (error) {
      console.log("Error deleting comment", error);
    }
  };

  if (loading) return <Loading />;

  if (comments.length === 0) return <p>No comments yet.</p>;

  return (
    <div className="comments-box">
      <h3>Comments</h3>
      <FormComment articleId={id} onAddComment={handleAddComment} />
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id} className="comment-item">
            <p>
              <strong>@{comment.author}</strong>: {comment.body}
            </p>
            {user && comment.author === user.username && (
              <button
                className="delete-button"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};
