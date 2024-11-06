import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById, updateArticleById } from "../utils/api";
import CommentCard from "./CommentCard";

export default function SingleArticlePage() {
  const [singleArticle, setSingleArticle] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();
  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticleById(article_id)
      .then((response) => {
        setSingleArticle(response);
        setVotes(response.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isError) {
    return <p>ERROR 404 - Content not found</p>;
  }
  if (isLoading) {
    return <div>LOADING!</div>;
  }
  const handleUpVote = () => {
    if (userVote === 1) {
      setVotes((prevVotes) => prevVotes - 1);
      updateArticleById(singleArticle.article_id, -1);
      setUserVote(0);
    } else {
      setVotes((prevVotes) =>
        userVote === -1 ? prevVotes + 2 : prevVotes + 1
      );
      updateArticleById(singleArticle.article_id, userVote === -1 ? 2 : 1);
      setUserVote(1);
    }
  };

  const handleDownVote = () => {
    if (userVote === -1) {
      setVotes((prevVotes) => prevVotes + 1);
      updateArticleById(singleArticle.article_id, 1);
      setUserVote(0);
    } else {
      setVotes((prevVotes) => (userVote === 1 ? prevVotes - 2 : prevVotes - 1));
      updateArticleById(singleArticle.article_id, userVote === 1 ? -2 : -1);
      setUserVote(-1);
    }
  };

  return (
    <section>
      <h3>{singleArticle.title}</h3>
      <p>Topic: {singleArticle.topic}</p>
      <p>Posted by: {singleArticle.author}</p>
      <img src={singleArticle.article_img_url} />
      <p>Article Votes: {votes}</p>
      <p>Comments: {singleArticle.comment_count}</p>
      <button onClick={handleUpVote} disabled={userVote === 1}>
        +1 vote
      </button>
      <button onClick={handleDownVote} disabled={userVote === -1}>
        -1 vote
      </button>
      <p>
        Created at: {new Date(singleArticle.created_at).toLocaleDateString()}
      </p>

      <h3>Comments:</h3>
      <CommentCard article_id={article_id} />
    </section>
  );
}
