import React from "react";
import shortid from "shortid";

function New(props) {
  return (
    <div className="wrap-item wrap-item-new">
      <span className="label">New!</span>
      {props.children}
    </div>
  );
}

function Popular(props) {
  return (
    <div className="wrap-item wrap-item-popular">
      <span className="label">Popular!</span>
      {props.children}
    </div>
  );
}

function withHighlight(Component) {
  function withHighlight(props) {
    if (props.views < 100) {
      return (
        <New>
          <Component {...props} />
        </New>
      );
    }

    if (props.views >= 1000) {
      return (
        <Popular>
          <Component {...props} />
        </Popular>
      );
    }

    return (
      <div>
        <Component {...props} />
      </div>
    );
  }
  return withHighlight;
}

function Article(props) {
  return (
    <div className="item item-article">
      <h3>
        <p>{props.title}</p>
      </h3>
      <p className="views">Прочтений: {props.views}</p>
    </div>
  );
}

function Video(props) {
  return (
    <div className="item item-video">
      <iframe
        title={props.url}
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <p className="views">Просмотров: {props.views}</p>
    </div>
  );
}

const VideoHighlight = withHighlight(Video);
const ArticleHighlight = withHighlight(Article);

function List(props) {
  return props.list.map((item) => {
    if (item.type === "video") {
      return <VideoHighlight key={shortid.generate()} {...item} />;
    }

    if (item.type === "article") {
      return <ArticleHighlight key={shortid.generate()} {...item} />;
    }

    return null;
  });
}

export default function App() {
  const list = [
    {
      type: "video",
      url:
        "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      views: 50,
    },
    {
      type: "video",
      url:
        "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      views: 12,
    },
    {
      type: "article",
      title: "Невероятные события в неизвестном поселке...",
      views: 175,
    },
    {
      type: "article",
      title: "Секретные данные были раскрыты!",
      views: 1532,
    },
    {
      type: "video",
      url:
        "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      views: 4253,
    },
    {
      type: "article",
      title: "Кот Бегемот обладает невероятной...",
      views: 12,
    },
  ];

  return <List list={list} />;
}
