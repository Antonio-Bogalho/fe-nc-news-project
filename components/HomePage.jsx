import { fetchAllArticles } from "../utils/api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

export default function HomePage() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultSortBy = searchParams.get("sort_by") || "created_at";
  const defaultOrder = searchParams.get("order") || "desc";

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    fetchAllArticles({ sortBy: defaultSortBy, order: defaultOrder })
      .then((response) => {
        setArticlesList(response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });
  }, [searchParams, defaultSortBy, defaultOrder]);

  const handleSortChange = (newSortBy, newOrder) => {
    setSearchParams({ sort_by: newSortBy, order: newOrder });
  };

  if (isError) return <p>ERROR 404 - Content not found</p>;
  if (isLoading) return <div>LOADING!</div>;

  return (
    <div>
      <div className="sort-controls">
        <label>Sort Articles by: </label>
        <select
          onChange={(e) => handleSortChange(e.target.value, defaultOrder)}
          value={defaultSortBy}
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>

        <label>Order: </label>
        <select
          onChange={(e) => handleSortChange(defaultSortBy, e.target.value)}
          value={defaultOrder}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <ul>
        {articlesList.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </ul>
    </div>
  );
}
