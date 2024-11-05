import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, fetchCommentsByArticleId } from "../utils/api";
import CommentCard from "./CommentCard";
export default function SingleArticlePage() {
  const [singleArticle, setSingleArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    if (article_id) {
      setIsLoading(true);
      setIsError(false);
      fetchArticleById(article_id)
        .then((response) => {
          setSingleArticle(response);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [article_id]);

  useEffect(() => {
    if (article_id) {
      fetchCommentsByArticleId(article_id)
        .then((commentData) => {
          setComments(commentData);
        })
        .catch((err) => {
          setIsError(true);
        });
    }
  }, [article_id]);

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }
  if (isLoading) {
    return <div>LOADING!</div>;
  }

  return (
    <>
      <section>
        <h3>{singleArticle.title}</h3>
        <p>Topic: {singleArticle.topic}</p>
        <p>Posted by: {singleArticle.author}</p>
        <img src={singleArticle.article_img_url} />
        <p>Article Votes: {singleArticle.votes}</p>
        <p>Comments: {singleArticle.comment_count}</p>
        <button>+1 vote</button>
        <button>-1 vote</button>
        <p>
          Created at: {new Date(singleArticle.created_at).toLocaleDateString()}
        </p>

        <h3>Comments:</h3>
        <input type="text" placeholder="Insert your comment here!" />
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p>No comments in this article, be the first to post something!</p>
        )}
      </section>
    </>
  );
}
