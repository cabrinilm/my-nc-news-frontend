const BASE_URL = "https://mysocial-513n.onrender.com/api";

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error("Erro fetching data");
    }
    return await response.json();
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
