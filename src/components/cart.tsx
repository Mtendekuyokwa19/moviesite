import { MovieCard, MovieDetails } from "./shop";

export function Cart({catalog,cardMove}:Cart) {


  return(
    <>
    {catalog.map(movie=><MovieCard movie={movie} cardMove={cardMove}/>)}
    </>
  )

}
interface Cart{
  catalog:MovieDetails[];
  cardMove:any;
}