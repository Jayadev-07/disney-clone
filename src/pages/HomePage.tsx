import Navbar from "../Components/Navbar";
import useMoviesApi from "../CustomHooks/useMoviesApi";
import "../scss/pagesStyle/HomePage.scss";
import VideoStore from "../Zustand/VideoStore";
import { useNavigate } from "react-router-dom";
import files from "../JsonFile/MoviesList.json";
import { useEffect, useState } from "react";
const HomePage = () => {
  const [detail, setDetail] = useState<number | null>(null);
  const { setVideoData } = VideoStore();
  const navigator = useNavigate();
  const { data } = useMoviesApi();
  const genres = [...new Set(data.flatMap((movie) => movie.genres))];
  const [count, setCount] = useState(0);
  const handleClick = (index: number) => {
    setVideoData(data[index]);
    navigator("/videoplayer");
  };

  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((prev) => (prev === 5 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(Interval);
  }, []);

  const handleScroll = (a: number, index: number) => {
    const container = document.getElementById(
      `movie-list-${index}`,
    ) as HTMLDivElement;
    container.scrollLeft += a;
  };
  return (
    <>
      <div className="section">
        <Navbar />
        <div className="img-conatiner">
          <img src={files.movies[count].posterUrl} />
          <div>
            <h3>{files.movies[count].title}</h3>
            <p>{files.movies[count].IMDb}</p>
          </div>
        </div>
        {genres.map((list, index) => (
          <div key={list} className="topics">
            <h2>{list}</h2>
            <div
              className="movie-list"
              id={`movie-list-${index}`}
              key={index}
              onMouseEnter={() => setDetail(index)}
              onMouseLeave={() => setDetail(null)}
            >
              {detail === index && (
                <div className="left-scroll">
                  <span onClick={() => handleScroll(-200, index)}>{`<`}</span>
                </div>
              )}
              {data.map((item, index) =>
                item.genres.includes(list) ? (
                  <div className="img-div" onClick={() => handleClick(index)}>
                    <img src={item.thumbnail} />
                  </div>
                ) : null,
              )}
              {detail === index && (
                <div className="right-scroll">
                  <span onClick={() => handleScroll(200, index)}>{`>`}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
