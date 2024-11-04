

export default function ArticleCard({ article }){
    return (
        <li>
            <h3>{article.title}</h3>
            <p>Topic: {article.topic}</p>
            <p>Posted by: {article.author}</p>
            <img src={article.article_img_url}/>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
            <button className="item-card-buy-btn">+1 vote</button>
            <button className="item-card-buy-btn">-1 vote</button>
            <p>Created at: {article.created_at}</p>
        </li>
    )
}