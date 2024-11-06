import { useState, useEffect } from "react";
import { addCommentsByArticleId, fetchCommentsByArticleId } from "../utils/api";

export default function CommentCard({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");

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

  const handleVote = (commentId, increment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.comment_id === commentId
          ? { ...comment, votes: comment.votes + increment }
          : comment
      )
    );
  };
  const postComment = () => {
    const commentData = { username, body };
    addCommentsByArticleId(article_id, commentData)
      .then((postedComment) => {
        if (postedComment) {
          setComments((prevComments) => [postedComment, ...prevComments]);
          setUsername("");
          setBody("");
        } else {
        }
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
      });
  };

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }
  if (isLoading) {
    return <div>LOADING!</div>;
  }

  return (
    <section>
      <div>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="Write a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={postComment}>Post Comment</button>
      </div>
      <ul>
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
            </li>
          ))
        ) : (
          <p>No comments in this article, be the first to post something!</p>
        )}
      </ul>
    </section>
  );
}
