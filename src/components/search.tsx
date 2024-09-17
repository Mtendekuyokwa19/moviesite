import { useEffect, useState } from "react";
import { movieFetch } from "./home";
import { resolve } from "path";
import { Loading, MovieCard, MovieDetails } from "./shop";

export default function  Search({search,cardMove}:ISearchQuery) {
const [foundMovie, setfoundMovie] = useState<MovieDetails>(new MovieDetails("",0,"","",[""],new Date(),"",0));


  useEffect(() => {
    let movie=MovieFetch(search);

    movie.then(result=>{
      let discoveredFilm=new MovieDetails(result.Title,parseFloat(result.imdbRating),result.Plot,result.Genre,[result.Actors],new Date(result.Released),result.Poster,parseInt(result.imdbID));
      discoveredFilm.image=result.Poster;
      setfoundMovie(discoveredFilm)

    })
    return () => {

    };
  }, [search]);

  return(
   <MovieResolve movie={foundMovie} cardMove={cardMove}/>
  )
}

interface ISearchQuery{
  search:string;
  cardMove:any;
}

async function MovieFetch(movie:string) {

  let movieget=fetch(movieFetch(movie));
  let resolveMovie=await movieget;

  return resolveMovie.json()

}


function MovieResolve({movie,cardMove}:IMovieResolve) {

  return(
    movie.name===undefined?<SearchLoading/>:<div className="grid grid-cols-5">

      <MovieCard movie={movie} cardMove={cardMove}/>
    </div>
  )

}
interface IMovieResolve{
  movie:MovieDetails;
  cardMove:any;

}

function SearchLoading() {

  return(
    <div className="flex justify-center items-center h-screen">

    <Loading type={"bars"} color={"red"}/>
    </div>
  )

}