import { MovieDetails } from "./shop";


export function Card({movie}:ICard) {



  return (
    <h1>{movie.name}</h1>
  )

}

interface ICard{

  movie:MovieDetails;
}