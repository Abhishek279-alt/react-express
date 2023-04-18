import React, { useEffect, useState } from "react";
import "./news.css";
import axios from "axios";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";

const WorldNews = () => {
  const [worldNews, setWorldNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getWorldNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      setWorldNews(response.data);
      console.log(response);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWorldNews();
  }, []);

  if (isloading) {
    return (
      <div className="container-fluid d-flex justify-content-center">
        <Puff
          height="80"
          width="80"
          radius={1}
          color="rgba(43, 42, 42, 0.6)"
          ariaLabel="puff-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  } else {
    return (
      <div className="container-fluid news-list">
        {worldNews.articles?.map((news) => {
          let id = worldNews.articles.indexOf(news);
          if (!worldNews.articles) {
            return null;
          } else {
            return <NewsCard key={id} newsArticles={news} />;
          }
        })}
      </div>
    );
  }
};

export default WorldNews;
