import { fetchAllArticles } from "../utils/api"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"


export default function HomePage(){
    const [articlesList, setArticlesList] = useState([])

    useEffect(() => {
        fetchAllArticles()
        .then((response) => {
            console.log(response)
            setArticlesList(response)
        })
    }, [])

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