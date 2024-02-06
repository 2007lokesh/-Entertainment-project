import React, { useEffect } from "react";
import axios from "axios";
import { Chip } from "@mui/material";

function Genres({
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  type,
  setPage,
}) {
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    setGenres([...genres, genre]);
    setPage(1);
  };
  const fetchGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU4NTE3M2E2MDIzZjhlZDM4OTRlNGQxYTYzZGFjZCIsInN1YiI6IjY1YmJkOGM2NDU5YWQ2MDE3YTZjOTQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DK-p4I4Lm28_Z68kOOKoDCymoG5sWTOk0_DY9ZQ6u1Y",
      },
    };

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
        options
      );
      setGenres(response.data.genres);
      console.log(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGenres();
    // return ()=>{
    //     setGenres({})
    // }
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ padding: "6px, 0" }}>
      {selectedGenres.map((genre) => (
        <Chip
          label={genre.name}
          variant="outlined"
          style={{ margin: 2, color:"primary", fontWeight: "bold" }}
          size="small"
          clickable
          key={genre.id}
          onDelete={()=> handleRemove(genre)}
          
        />
      ))}

      {genres.map((genre) => (
        <Chip
          label={genre.name}
          variant="outlined"
          style={{ margin: 2, backgroundColor:"white", fontWeight: "bold" }}
          size="small"
          clickable
          key={genre.id}
          onClick={()=> handleAdd(genre)}
        />
      ))}
    </div>
  );
}

export default Genres;
