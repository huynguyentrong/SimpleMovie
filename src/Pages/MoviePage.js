import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/Movies/MovieCard";
import useDebounce from "../hooks/useDebounce";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton";
import ReactPaginate from "react-paginate";
const itemsPerPage = 20;
const MoviePage = () => {
  const [filter, setFilter] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };
  const FilterDebounce = useDebounce(filter, 500);
  const [Url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=20571353bf8956287b7dda41ff6a0932`
  );
  const { data, error } = useSWR(Url, fetcher);
  const loading = !data && !error;
  useEffect(() => {
    if (FilterDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=20571353bf8956287b7dda41ff6a0932&query=${FilterDebounce}&page=${nextPage}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=20571353bf8956287b7dda41ff6a0932&page=${nextPage}`
      );
    }
  }, [FilterDebounce, nextPage]);
  const movies = data?.results || [];
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="py-10">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="type to search"
            onChange={handleChangeFilter}
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {Array(4)
            .fill(0)
            .map((item, index) => (
              <MovieCardLoading key={index}></MovieCardLoading>
            ))}
        </div>
      )}
      <div className="grid gap-10 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </div>
  );
};
function MovieCardLoading() {
  return (
    <div className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-slate-800">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="16px"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1 py-3">
        <h3 className="mb-3 text-xl font-bold ">
          <LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between mb-10 text-sm opacity-50">
          <span>
            <LoadingSkeleton width="70px" height="20px"></LoadingSkeleton>
          </span>

          <span>
            <LoadingSkeleton width="70px" height="20px"></LoadingSkeleton>
          </span>
        </div>
        <button>
          <LoadingSkeleton width="100%" height="40px"></LoadingSkeleton>
        </button>
      </div>
    </div>
  );
}
export default MoviePage;
