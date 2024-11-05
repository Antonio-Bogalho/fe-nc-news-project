import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchArticleById } from "../utils/api"

export default function SingleArticlePage(){
    const [singleArticle, setSingleArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const { article_id} = useParams()

    useEffect(() => {
        if (article_id){
        setIsLoading(true)
        setIsError(false)
        fetchArticleById(article_id)
        .then((response) => {
            setSingleArticle(response)
            setIsLoading(false)
        }).catch((err) => {
            setIsError(true)
            setIsLoading(false)
        })}
    }, [article_id])
 
if(isError){
    return <p>ERROR 404 - Content not found</p>
}
if (isLoading){
    return <div>LOADING!</div>            
}


return (
        <>
        <section>
        <h3>{singleArticle.title}</h3>
            <p>Topic: {singleArticle.topic}</p>
            <p>Posted by: {singleArticle.author}</p>
            <img src={singleArticle.article_img_url}/>
            <p>Votes: {singleArticle.votes}</p>
            <p>Comments: {singleArticle.comment_count}</p>
            <button className="item-card-buy-btn">+1 vote</button>
            <button className="item-card-buy-btn">-1 vote</button>
            <p>Created at: {singleArticle.created_at}</p>
            <p>Test text to see if single card is unique, add comments to it later</p>

        </section>
        </>
    )
}