import React, { useEffect, useState } from "react";
import axios from "axios";
import "./news.css";
import NewsCard from "./NewsCard";
import { Puff } from "react-loader-spinner";

const SportsNews = () => {
  const [sportsNews, setSportsNews] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const getSportsNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      console.log(response);
      setSportsNews(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSportsNews();
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
        {sportsNews.articles?.map((news) => {
          let newsId = sportsNews.articles.indexOf(news);
          return <NewsCard key={newsId} newsArticles={news} />;
        })}
      </div>
    );
  }
};

export default SportsNews;
