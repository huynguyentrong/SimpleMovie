import React from "react";
import { fetcher } from "../config";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/Movies/MovieCard";
const MovieDetail = () => {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=20571353bf8956287b7dda41ff6a0932`,
    fetcher
  );
  if (!data) return null;
  return (
    <>
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data?.backdrop_path})`,
          }}
        ></div>
      </div>

      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <h1 className="mb-10 text-3xl font-bold text-center">{data?.title}</h1>
      {data.genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5 ">
          {data.genres.map((item) => (
            <span
              className="px-4 py-2 border rounded border-primary text-primary"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}

      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {data?.overview}
      </p>
      <MovieCredit></MovieCredit>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </>
  );
};
function MovieCredit() {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=20571353bf8956287b7dda41ff6a0932`,
    fetcher
  );
  if (!data) return null;
  if (!data.cast || data.cast.length <= 0) return null;
  return (
    <>
      <h2 className="mb-10 text-3xl font-bold text-center">Casts</h2>
      <div className="grid grid-cols-4 gap-10">
        {data.cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg"
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideo() {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=20571353bf8956287b7dda41ff6a0932`,
    fetcher
  );
  if (!data) return null;
  if (!data.results || data.results.length <= 0) return null;
  return (
    <>
      <div className="py-10">
        {data.results.slice(0, 1).map((item) => (
          <div key={item.id} className="w-[1280px] h-[800px] mx-auto">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="object-fill w-full h-full"
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieSimilar() {
  const { movieId } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=20571353bf8956287b7dda41ff6a0932`,
    fetcher
  );
  if (!data) return null;
  if (!data.results || data.results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="mb-10 text-3xl font-bold text-center">Similar Movies</h2>
      <div className="movie-list">
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {data.results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetail;
