import React from "react";
import noImage from "../assets/no-image-icon-23500.jpg";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

const NewsCard = (props) => {
  const news = props.newsArticles;
  const bgColor = "rgba(43, 42, 42, 0.6)";
  const bgstyle = {};
  bgstyle.fill = bgColor;
  return (
    <>
      <div className="card news-card">
        {!news.urlToImage ? (
          <img
            src={noImage}
            className="card-img-top rounded-0"
            alt="..."
            style={{ backgroundImage: "../assets/noise.png", opacity: "0.85" }}
          />
        ) : (
          <img
            src={news.urlToImage}
            className="card-img-top rounded-0"
            alt="..."
            style={{ backgroundImage: "../assets/noise.png", opacity: "0.85" }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">
            {news.title}(Source:{news.source.name})
          </h5>
          <p className="card-text">
            {news.description}[...]{" "}
            <a
              href={news.url}
              className="text-decoration-none text-dark read-more"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
            <span className="mx-2">
              {" "}
              <WhatsappShareButton url={news.url}>
                <WhatsappIcon size={20} bgStyle={bgstyle} />
              </WhatsappShareButton>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
