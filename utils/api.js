import axios from "axios"

const api = axios.create({
    baseURL: 'https://be-nc-news-backend-project-hauf.onrender.com/api',
  });

function fetchAllArticles(){
    return api.get(`/articles`).then((response) => {
        return response.data.articles
    })
}

export { fetchAllArticles }