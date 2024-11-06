import { useState, useEffect } from "react";
import { fetchCommentsByArticleId } from "../utils/api";

export default function CommentCard({ article_id }) {
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }
  if (isLoading) {
    return <div>LOADING!</div>;
  }

  return (
    <ul>
        {comments.length > 0 ? (
            comments.map((comment) => (
                <li key={comment.comment_id}>
                    <p>
                        <strong>{comment.author}</strong> on{" "}
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
);
}


