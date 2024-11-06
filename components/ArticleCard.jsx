import { Link } from "react-router-dom";
import { useState } from "react";
import { updateArticleById } from "../utils/api";

export default function ArticleCard({ article }) {
  const [votes, setVotes] = useState(article.votes);
  const [userVote, setUserVote] = useState(0);

  const handleUpVote = () => {
    if (userVote === 1) {
      setVotes((prevVotes) => prevVotes - 1);
      updateArticleById(article.article_id, -1);
      setUserVote(0);
    } else {
      setVotes((prevVotes) =>
        userVote === -1 ? prevVotes + 2 : prevVotes + 1
      );
      updateArticleById(article.article_id, userVote === -1 ? 2 : 1);
      setUserVote(1);
    }
  };

  const handleDownVote = () => {
    if (userVote === -1) {
      setVotes((prevVotes) => prevVotes + 1);
      updateArticleById(article.article_id, 1);
      setUserVote(0);
    } else {
      setVotes((prevVotes) => (userVote === 1 ? prevVotes - 2 : prevVotes - 1));
      updateArticleById(article.article_id, userVote === 1 ? -2 : -1);
      setUserVote(-1);
    }
  };

  return (
    <li>
      <Link to={`/articles/${article.article_id}`}>
        <h3>{article.title}</h3>
        <p>Topic: {article.topic}</p>
        <p>Posted by: {article.author}</p>
        <img src={article.article_img_url} />
        <p>Votes: {votes}</p>
        <p>Comments: {article.comment_count}</p>
      </Link>
      <button onClick={handleUpVote} disabled={userVote === 1}>
        +1 vote
      </button>
      <button onClick={handleDownVote} disabled={userVote === -1}>
        -1 vote
      </button>
      <p>Created at: {article.created_at}</p>
    </li>
  );
}
