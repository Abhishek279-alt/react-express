import React from "react";

const NewsCard = (props) => {
  const news = props.newsArticles;
  return (
    <>
      <div className="card news-card">
        <img
          src={news.urlToImage}
          className="card-img-top rounded-0"
          alt="..."
          style={{ backgroundImage: "../assets/noise.png", opacity: "0.85" }}
        />
        <div className="card-body">
          <h5 className="card-title">{news.title}</h5>
          <p className="card-text">
            {news.description}[...]{" "}
            <a
              href={news.url}
              className="text-decoration-none text-dark read-more"
            >
              Read more
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
