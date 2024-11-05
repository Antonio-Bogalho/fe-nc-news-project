export default function CommentCard({ comment }) {
  return (
    <li key={comment.comment_id}>
      <p>
        <strong>{comment.author}</strong> on{" "}
        {new Date(comment.created_at).toLocaleDateString()}
      </p>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
      <button>+1 vote</button>
      <button>-1 vote</button>
    </li>
  );
}
