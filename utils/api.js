import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-backend-project-hauf.onrender.com/api",
});

function fetchAllArticles() {
  return api
    .get(`/articles`)
    .then((response) => {
      return response.data.articles;
    })
    .catch((err) => {
      console.error(err);
    });
}
function fetchArticleById(article_id) {
  return api
    .get(`/articles/${article_id}`)
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.error(err);
    });
}
function fetchCommentsByArticleId(article_id) {
  return api
    .get(`/articles/${article_id}/comments`)
    .then((response) => {
      return response.data.comments;
    })
    .catch((err) => {
      console.error(err);
    });
}

function updateArticleById(article_id, increment) {
  return api
    .patch(`/articles/${article_id}`, { inc_votes: increment })
    .then((response) => {
      return response.data.article;
    })
    .catch((err) => {
      console.error(err);
    });
}
function addCommentsByArticleId(article_id, commentData) {
  return api
    .post(`/articles/${article_id}/comments`, commentData)
    .then((response) => {
      return response.data.comment;
    })
    .catch((err) => {
      console.error(err);
    });
}
function deleteCommentById(comment_id) {
  return api
    .delete(`/comments/${comment_id}`)
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.error(err);
    });
}

export {
  fetchAllArticles,
  fetchArticleById,
  fetchCommentsByArticleId,
  updateArticleById,
  addCommentsByArticleId,
  deleteCommentById
};
