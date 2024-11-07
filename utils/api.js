import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-backend-project-hauf.onrender.com/api",
});

function fetchAllArticles() {
  return api.get(`/articles`).then((response) => {
    return response.data.articles;
  });
}
function fetchArticleById(article_id) {
  return api.get(`/articles/${article_id}`).then((response) => {
    return response.data.article;
  });
}
function fetchCommentsByArticleId(article_id) {
  return api.get(`/articles/${article_id}/comments`).then((response) => {
    return response.data.comments;
  });
}

function updateArticleById(article_id, increment) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data.article;
    });
}
function addCommentsByArticleId(article_id, commentData) {
  return api
    .post(`/articles/${article_id}/comments`, commentData)
    .then((response) => {
      return response.data.comment;
    });
}
function deleteCommentById(comment_id) {
  return api.delete(`/comments/${comment_id}`).then((response) => {
    return response.data;
  });
}
function fetchArticlesByTopic(topic) {
  return api
    .get(`/articles?topic=${topic}`)
    .then((response) => response.data.articles);
}
function fetchUsers() {
  return api.get("/users").then((response) => {
    return response.data.users;
  });
}

export {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleById,
  addCommentsByArticleId,
  deleteCommentById,
  fetchArticlesByTopic,
  fetchUsers,
};
