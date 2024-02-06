import { TextField, useTheme, Button, Tabs, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SingleContent from "../../components/singlecontent/SingleContent";
import CustomPagination from "../../pagination/CustomPagination";

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const theme = useTheme()

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${
          type ? "tv" : "movie"
        }?include_adult=false&language=en-US&query=${searchText}&page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU4NTE3M2E2MDIzZjhlZDM4OTRlNGQxYTYzZGFjZCIsInN1YiI6IjY1YmJkOGM2NDU5YWQ2MDE3YTZjOTQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DK-p4I4Lm28_Z68kOOKoDCymoG5sWTOk0_DY9ZQ6u1Y",
          },
        }
      );

      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line
  }, [page, type]);

  return (
    <div>
      <div className="search" style={{ display: "flex", margin: "15px, 0" }}>
        <TextField
          style={{ flex: 1,  color: theme.palette.common.white }}
          className="searchBox"
          label="search"
          variant="filled"
          inputProps={{
            style:{
              color: theme.palette.common.white
            }
          }}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
        
          variant="contained"
          style={{ marginLeft: 10, color: theme.palette.common.white }}
          onClick={fetchSearch}
        >
          <SearchIcon />
        </Button>
      </div>

      <Tabs
        value={type}
        // indicatorColor="primary"
        // textColor="primary"
        onChange={(event, newValue) => {
          setType(newValue);
          setPage(1);
        }}
      >
        <Tab style={{ width: "50%", color: theme.palette.common.white }} label="seach movies" />
        <Tab style={{ width: "50%", color: theme.palette.common.white }} label="seach Tv series" />
      </Tabs>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Search;
