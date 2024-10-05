import { url } from "inspector";
import { MovieDetails, useMovie } from "./shop";
import { ChooseHeroBtns, movieFetch } from "./home";
import { BackToShop, BuyNowIcon, StartCategoryIcon } from "./svg";
import { useEffect, useState } from "react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Link, useOutletContext, useParams } from "react-router-dom";


export function Card({movie,AddtoCart,toogleWatchlist,movies}:ICard) {
  const [MovieAnalysis, setMovieAnanlysis] = useState(new MovieCardSet());


console.log(movie,"here")
  let backdrop=movie.image;

useEffect(() => {
  movieGot(movie.id.toString(),(movie:MovieCardSet)=>setMovieAnanlysis(movie))

  return () => {

  };
}, []);


  return (
    <div style={{
       backgroundImage:`url(${backdrop})`,


    }}  className="h-screen cardDetails  flex flex-col ">

<div className="flex flex-col justify-center items-center h-screen">

    <MovieCard movie={movie} AddtoCart={AddtoCart} toogleWatchlist={toogleWatchlist} Movies={movies} />
</div>
    </div>
  )

}




interface ICard{

  movie:MovieDetails;
  AddtoCart:any;
  toogleWatchlist:any;
  movies:MovieDetails[]
}

function MovieCard({movie,AddtoCart,toogleWatchlist,Movies}:ImovieCard) {



  return(
    <div className="w-1/2 h-4/5 rounded-md" id="modal">
      <div>
        <Link to={"/Shop"}>
<button type="button" className=" text-white bg-lime-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  <BackToShop/> Back to Shop
</button>
        </Link>

      </div>
      {/* <div className="h-2/5 overflow-hidden">

        <img src={movie?.image}  className="w-screen rounded-2xl " alt="" />
      </div> */}

        <div className="flex bg-white z-10 h-3/5 justify-evenly flex-1  p-5 rounded-sm">
          <MovieResearch movie={movie} AddtoCart={AddtoCart} toogleWatchlist={toogleWatchlist} Movies={Movies}/>

        </div>
    </div>
  )

}
interface ImovieCard{
movie:MovieDetails;
AddtoCart:any;
toogleWatchlist:any;
Movies:MovieDetails[];
}


function MovieResearch({movie,AddtoCart,toogleWatchlist,Movies}:ImovieCard){

  return(
    <div className="flex flex-col gap-5 p-5">
    <div className="bg-white flex flex-col gap-2">

    <h1 className="text-3xl font-bold">{movie.name+" ("+movie.year.getFullYear()+")"}</h1>
    <p className="font-bold text-md flex gap-2 items-center">
      <StartCategoryIcon/>
      {movie.rating+"|"+movie.category}</p>
    </div>

    <p className="text-md ">{movie.description}</p>


    <MovieButton AddtoCart={AddtoCart} movie={movie} toogleWatchlist={toogleWatchlist} Movies={Movies} />
    </div>
  )
}

function Shooting(){

return(
  <div className="bg-white flex flex-col ">
      <ShootingDetails title={""} description={""}/>

      <ShootingDetails title={""} description={""}/>


      <ShootingDetails title={""} description={""}/>

  </div>
)
}

function ShootingDetails({title,description}:IShootingDetails){

  return(
<>

 <div className="flex flex-col gap-2 justify-center items-center">
      <p className="text-sm">Runtime:</p>
      <h1 className="text-lg text-orange-600 w-8 font-semibold">88min | 73 min</h1>
    </div>
</>
  )
}

interface IShootingDetails{
  title:string;
  description:string;
}


function MovieButton({movie,AddtoCart,toogleWatchlist,Movies}:ImovieCard) {
  const [bought, setbought] = useState(movie.inCart);
const [watchlist, setwatchlist] = useState(movie.IsInWatchList(Movies));
function tooglebuy() {

  setbought(!bought)
  if(bought){
    //TODO update movie detail
    toogleWatchlist(movie)
    return;
  }
  AddtoCart(movie)
}

function toogleWatchList() {
   setwatchlist(!watchlist);

    toogleWatchlist(movie,watchlist)





}

  return(
    <div className="flex gap-2 ">

     <button className="flex items-center justify-center bg-green-700 text-white flex-1  rounded-md gap-2 hover:bg-emerald-700 "onClick={tooglebuy}>
      <BuyNowIcon/>
     <p>{bought?"Remove From Cart":"Buy Now"}</p>
     </button>
     <button className="flex items-center justify-center  text-black py-4  flex-1 rounded-md gap-2 border-2 border-gray-950 hover:bg-slate-200 " onClick={toogleWatchList}>
     <p>{watchlist?"Remove from Watchlist":"Add to Watchlist"}</p>
       </button>
    </div>

  )

}

class MovieCardSet {
  title!: string;
  Year!: string;
  Rated!: string;
  Runtime!: string;
  genre!: string;
  director!: string;
  writer!: string;
  Actors!: string;
  plot!: string;
  language!: string;
  country!: string;
  poster!: string;
  metascore!: number;
  imdbRating!: number;
  imdbvotes!: number;
  BoxOffice!: number | string;


  setAll(title:string,Actors:string,BoxOffice:number|string,poster:string,Rated:string,Runtime:string,Year:string,country:string,director:string,genre:string,writer:string,metascore:number,imdbRating:number,imdbvotes:number,language:string,plot:string,) {
    this.title=title;
    this.Actors=Actors;
    this.BoxOffice=BoxOffice;
    this.Rated=Rated;
    this.Runtime=Runtime;
    this.Year=Year;
    this.country=country;
    this.director=director;
    this.genre=genre;
    this.imdbRating=imdbRating;
    this.imdbvotes=imdbvotes;
    this.language=language;
    this.metascore=metascore;
    this.plot=plot;
    this.writer=writer;
    this.poster=poster;



  }
}


async function FetchMovie(id:string){

  let movieDetails=fetch(urlSolicit(id))
  let response= await movieDetails;

return response.json()

}

function movieGot(id:string,setMovie:any) {
  let movie= new MovieCardSet();

  let getMovie=FetchMovie(id);
  getMovie.then((result)=>{

   movie.setAll(result.Title,result.Actors,result.BoxOffice,result.Poster,result.Rated,result.Runtime,result.Year,result.Country,result.Director,result.Genre,result.Writer,parseFloat(result.Metascore),parseFloat(result.imdbRating),parseFloat(result.imdbVotes),result.Language,result.Plot)
    console.log(movie)
    setMovie(movie)
     return movie

  })


}


function urlSolicit(id:string) {

  return `https://www.omdbapi.com/?t=${id}&apikey=4f9a8426`;

}