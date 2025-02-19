import { useState } from "react";
import { addComment } from "../api";  

export const FormComment = ({ articleId, onAddComment }) => {
  const [comment, setComment] = useState("");  
  const [username, setUsername] = useState("");  
  const [error, setError] = useState(null);  

  
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
      console.log("Comment added:", response);

     
      onAddComment(response.comment);

    
      setComment("");
      setUsername("");
      setError(null);  
    } catch (error) {
      setError("Error adding comment. Please try again.");  
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <label htmlFor="comment">Comment</label>
      <textarea
        id="comment"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
        required
      />
      {error && <p className="error">{error}</p>} 
      <button type="submit">Submit Comment</button>
    </form>
  );
};
