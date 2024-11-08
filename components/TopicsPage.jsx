import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchArticlesByTopic } from "../utils/api";
import ArticleCard from "./ArticleCard";

export default function TopicsPage() {
  const { topic } = useParams();
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetchArticlesByTopic(topic)
      .then((fetchedArticles) => {
        setArticlesList(fetchedArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 404){
          setIsError(true);
        }
      });
  }, [topic]);

  if (isError) {
    return <p>ERROR 404 - Topic not found</p>;
  }
  if (isLoading) {
    return <div>LOADING!</div>;
  }

  return (
    <div>
      <h2>Articles on {topic.charAt(0).toUpperCase() + topic.slice(1)}!</h2>
      <ul>
        {articlesList.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </ul>
    </div>
  );
}
