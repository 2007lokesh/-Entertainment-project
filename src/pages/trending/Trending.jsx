import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SingleContent from "../../components/singlecontent/SingleContent";
import './Trending.css'
import CustomPagination from "../../pagination/CustomPagination";


const Trending = () => {
  const [page, setPage] = useState(1)
  const [content, setContent] = useState([]);
  
  console.log(content);
  console.log(page)
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`,
        {
          headers: {
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OTU4NTE3M2E2MDIzZjhlZDM4OTRlNGQxYTYzZGFjZCIsInN1YiI6IjY1YmJkOGM2NDU5YWQ2MDE3YTZjOTQxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DK-p4I4Lm28_Z68kOOKoDCymoG5sWTOk0_DY9ZQ6u1Y",
          },
        }
      );
      setContent(data.results);

     
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line 
  },[page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        { content && content.map((c) => (
          <SingleContent
          key={c.id}
          id={c.id}
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}
        />
        ))}
      </div>
      <CustomPagination setPage= {setPage}/>
    </div>
  );
};

export default Trending;
