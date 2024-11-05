import { fetchAllArticles } from "../utils/api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"


export default function HomePage(){
    const [articlesList, setArticlesList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        fetchAllArticles()
        .then((response) => {
            setArticlesList(response)
            setIsLoading(false)
        }).catch((err) => {
            setIsError(true)
        })
    }, [])

    if(isError){
        return <p>ERROR 404 - Content not found</p>
    }
    if (isLoading){
        return <div>LOADING!</div>            
    }

    return (
        <div>
            <ul>
                {articlesList.map(( article ) => {
                    return <ArticleCard article={article} key={article.article_id} />
                })}
            </ul>
        </div>
        
    )
}