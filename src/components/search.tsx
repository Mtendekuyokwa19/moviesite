import { useEffect, useState } from "react";
import { movieFetch } from "./home";
import { resolve } from "path";
import { Loading, MovieCard, MovieDetails } from "./shop";

export default function  Search({search,cardMove,toogleWatchlist}:ISearchQuery) {
const [foundMovie, setfoundMovie] = useState<MovieDetails>(new MovieDetails(undefined,0,"","",[""],new Date(),"",0));


  useEffect(() => {
    console.log(search)
    let movie=MovieFetch(search);

    movie.then(result=>{
      let discoveredFilm=new MovieDetails(result.Title,parseFloat(result.imdbRating),result.Plot,result.Genre,[result.Actors],new Date(result.Released),result.Poster,parseInt(result.imdbID));
      discoveredFilm.image=result.Poster;
      discoveredFilm.setVoteCount(parseInt(result.imdbVotes))
      discoveredFilm.setVotingAverage(result.imdbRating)
      console.log(discoveredFilm,result)

      setfoundMovie(discoveredFilm)

    })
    return () => {

    };
  }, [search]);

  return(
   <MovieResolve movie={foundMovie} cardMove={cardMove} toogleWatchList={toogleWatchlist}/>
  )
}

interface ISearchQuery{
  search:string;
  cardMove:any;
  toogleWatchlist:any;
}

async function MovieFetch(movie:string) {

  let movieget=fetch(movieFetch(movie));
  let resolveMovie=await movieget;

  return resolveMovie.json()

}


function MovieResolve({movie,cardMove,toogleWatchList}:IMovieResolve) {

  return(
    movie.name===undefined?<SearchLoading/>:<div className="sm:grid sm:grid-cols-5 flex flex-col">

      <MovieCard movie={movie} cardMove={cardMove} manageWatchlist={toogleWatchList} MovieList={[]}/>
    </div>
  )

}
interface IMovieResolve{
  movie:MovieDetails;
  cardMove:any;
  toogleWatchList:any;

}

function SearchLoading() {

  return(
    <div className="flex justify-center items-center h-screen">

    <Loading type={"bars"} color={"red"}/>
    </div>
  )

}