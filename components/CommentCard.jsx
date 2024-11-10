import { useState, useEffect } from "react";
import {
  addCommentsByArticleId,
  fetchCommentsByArticleId,
  deleteCommentById,
} from "../utils/api";

export default function CommentCard({ article_id, username }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [postError, setPostError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchCommentsByArticleId(article_id)
      .then((commentData) => {
        setComments(commentData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  const handleVote = (comment_id, increment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === comment_id
          ? { ...comment, votes: comment.votes + increment }
          : comment
      )
    );
  };

  const postComment = () => {
    if (!body.trim()) {
      setErrorMessage("Please enter a comment before posting.");
      return;
    }
    setErrorMessage("");

    const optimisticComment = {
      comment_id: Date.now(),
      author: username,
      body,
      votes: 0,
      created_at: new Date().toISOString(),
    };

    setComments((prevComments) => [optimisticComment, ...prevComments]);
    setBody("");

    addCommentsByArticleId(article_id, { username, body })
      .then((postedComment) => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.comment_id === optimisticComment.comment_id
              ? postedComment
              : comment
          )
        );
        setPostError("");
      })
      .catch((err) => {
        setPostError("Error posting comment.");

        setComments((prevComments) =>
          prevComments.filter(
            (comment) => comment.comment_id !== optimisticComment.comment_id
          )
        );
      });
  };

  const deleteComment = (comment_id) => {
    const commentToDelete = comments.find(
      (comment) => comment.comment_id === comment_id
    );
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );

    deleteCommentById(comment_id).catch((err) => {
      setComments((prevComments) => [commentToDelete, ...prevComments]);
    });
  };

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }

  if (isLoading) {
    return <div>LOADING!</div>;
  }

  return (
    <section className="comment-section">
      <div className="comment-input-container">
        <textarea
          placeholder="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={postComment}>Post Comment</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {postError && <p style={{ color: "red" }}>{postError}</p>}
      </div>

      <ul className="comments-section">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.comment_id}>
              <p>
                <b>{comment.author}</b> on{" "}
                {new Date(comment.created_at).toLocaleDateString()}
              </p>
              <p>{comment.body}</p>
              <p>Votes: {comment.votes}</p>
              <button onClick={() => handleVote(comment.comment_id, 1)}>
                +1 vote
              </button>
              <button onClick={() => handleVote(comment.comment_id, -1)}>
                -1 vote
              </button>
              {comment.author === username && (
                <button onClick={() => deleteComment(comment.comment_id)}>
                  Delete Comment
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No comments in this article, be the first to post something!</p>
        )}
      </ul>
    </section>
  );
}
