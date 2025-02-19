import { useState } from "react";
import { addComment } from "../api";  

export const FormComment = ({ articleId, onAddComment }) => {
  const [comment, setComment] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !comment) {
      setError("Both username and comment are required!");
      return;
    }

    const newComment = { username, body: comment };

    try {
      const response = await addComment(articleId, newComment);  
      
      onAddComment(response.comment);  
      setComment("");  
      setUsername("");  
      setError(null);  
      setSuccessMessage("Comment added successfully! ✅"); 

      setTimeout(() => {
        setSuccessMessage(""); 
      }, 3000);

    } catch (error) {
      setError("Username or comment invalid, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <label htmlFor="username" className="form-label">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        required
        className="form-input"
      />
      <label htmlFor="comment" className="form-label">Comment</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
        required
        className="form-textarea"
      />
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <button type="submit" className="form-button">Submit Comment</button>
    </form>
  );
};
