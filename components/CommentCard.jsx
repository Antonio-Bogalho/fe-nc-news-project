import { useState } from "react"

export default function CommentCard({ comment }) {
    const [votes, setVotes ] = useState(comment.votes)

    const handleUpVote = () => {
        setVotes(votes + 1)
    }

    const handleDownVote = () => {
        setVotes(votes - 1)
    }

  return (
    <li key={comment.comment_id}>
      <p>
        <strong>{comment.author}</strong> on{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p>{comment.body}</p>
      <p>Votes: {votes}</p>
      <button onClick={handleUpVote}>+1 vote</button>
      <button onClick={handleDownVote}>-1 vote</button>
    </li>
  );
}

