import axios from 'axios';

const BASE_URL = "https://mysocial-513n.onrender.com/api";


const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error req:", error);
    throw error;
  }
};


export const getArticles = async () => {
  return fetchData("/articles");
};


export const getArticleById = async (id) => {
  return fetchData(`/articles/${id}`);
};


export const getCommentsByArticleId = async (articleId) => {
  return fetchData(`/articles/${articleId}/comments`);
};


export const updateArticleVotes = async (articleId, increment) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/articles/${articleId}`,
      { inc_votes: increment },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating votes:", error);
    throw error;
  }
};



export const addComment = async (articleId, commentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/articles/${articleId}/comments`,
      commentData
    );
    return response.data; 
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error; 
  }
};



export const deleteCommentById = async (commentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`);
    return response.data; 
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error; 
  }
};



export const getUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data.users; 
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};