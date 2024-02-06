import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/singlecontent/SingleContent";
import CustomPagination from "../../pagination/CustomPagination";
import Genres from "../../components/Genres/Genres";
import useGenres from "../../hooks/useGenres";
function Movies() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPage, setNumOfPage] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genresUrl = useGenres(selectedGenres)
  console.log(page);
  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU4NTE3M2E2MDIzZjhlZDM4OTRlNGQxYTYzZGFjZCIsInN1YiI6IjY1YmJkOGM2NDU5YWQ2MDE3YTZjOTQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DK-p4I4Lm28_Z68kOOKoDCymoG5sWTOk0_DY9ZQ6u1Y",
      },
    };

    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genresUrl}`,
        options
      );
      setContent(data.results);
      setNumOfPage(data.total_pages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, genresUrl]);

  return (
    <div>
      <span className="pageTitle"> Discover Movies</span>
      <Genres
      type="movie"
        genres={genres}
        setGenres={setGenres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <div>
        {numOfPage >1 &&(
        <CustomPagination setPage={setPage} numOfPages={numOfPage} />
        )}
      </div>
    </div>
  );
}

export default Movies;
