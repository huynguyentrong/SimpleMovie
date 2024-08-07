import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Main from "./components/layout/Main";
import Banner from "./components/banner/Banner";
// import HomePage from "./Pages/HomePage";
// import MoviePage from "./Pages/MoviePage";
// import MovieDetail from "./Pages/MovieDetail";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./Pages/HomePage"));
const MoviePage = lazy(() => import("./Pages/MoviePage"));
const MovieDetail = lazy(() => import("./Pages/MovieDetail"));
function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetail></MovieDetail>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
