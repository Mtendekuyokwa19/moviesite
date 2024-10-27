import React, { CSSProperties, useEffect, useState } from 'react'
import { movieFetch } from './home';
import { MovieDetails } from './shop';
import { useParams } from 'react-router-dom';
import { Card } from './card';
import ReactLoading from 'react-loading';
import { ClimbingBoxLoader, ClipLoader, PropagateLoader } from 'react-spinners';


async function getMovie(name: string) {
  try {

    let movie = await fetch(movieFetch(name))
    let response = await movie.json()

    return response
  } catch (error) {
    console.error(error)
  }

}

function useMovieGet(name: string) {

  const [Movie, setMovie] = useState<MovieDetails>(new MovieDetails("", 2, "", "", [""], new Date(), "", 2));
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    let fetchedMovie = getMovie(name);

    fetchedMovie.then((resolve) => {
      console.log(fetchedMovie)
      let movie = new MovieDetails(resolve.Title, resolve.imdbRating, resolve.Plot, "movie", [""], new Date(resolve.Released), resolve.image, 4);
      movie.image = resolve.Poster;
      movie.setVoteCount(resolve.imdbVotes);
      movie.setVotingAverage(resolve.imdbRating)
      setMovie(movie);
      console.log(Movie)

    })
      .finally(() => setLoading(true))
    return () => {

    };
  }, [name]);



  return { Movie, Loading }

}


export default function MovieDetailsfetcher({ AddtoCart, removefromcart, toogleWatchlist, movies }: IMovieFetcher) {
  const { name } = useParams();
  const { Movie, Loading } = useMovieGet(name as string)

  return (
    Loading ? <Card movie={Movie as MovieDetails} removeFromCart={removefromcart} AddtoCart={AddtoCart} toogleWatchlist={toogleWatchlist} movies={movies} /> : <LoadingAnimation />
  )
}

interface IMovieFetcher {
  removefromcart: any;
  AddtoCart: any;
  toogleWatchlist: any;
  movies: MovieDetails[]
}

function LoadingAnimation() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  }

  return (
    <div className='flex items-center h-screen'>
      <PropagateLoader
        color="#ea666d"
        loading={true}
        cssOverride={override}

        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
