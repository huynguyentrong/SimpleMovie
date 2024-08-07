import React from "react";
import { useNavigate } from "react-router-dom";
const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <img
        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
        alt=""
        className="w-full h-[250px] object-cover mb-5 "
      />
      <div className="flex flex-col flex-1">
        <h3 className="mb-3 text-xl font-bold ">{item.title}</h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>{new Date(item.release_date).getFullYear()}</span>
          <span>{item.vote_average}</span>
        </div>
        <button
          onClick={() => navigate(`/movie/${item.id}`)}
          className="w-full px-6 py-3 mt-auto font-medium rounded-lg bg-primary"
        >
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
