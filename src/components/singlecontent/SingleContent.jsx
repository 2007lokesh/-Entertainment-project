import React from "react";
import { img_300, unavailable } from "../../config/config";
import './SingleContent.css'
import { Badge } from "@mui/material";
function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  return (
    <div  className="media">
      <Badge  badgeContent={vote_average.toFixed(1)} color={vote_average<6 ?"primary":"secondary"}/>
      <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
      <b className="title">{title}</b>
      <span className="subTitle">{media_type === "tv" ?"TV Series":"Movies" }</span>
      <span className="subTitle">{date}</span>
    </div>
  );
}

export default SingleContent;
