import { ReactElement, useEffect, useState } from "react"
import { AddToWatchList, StartCategoryIcon, View } from "./svg"
import { resolve } from "path";
import ReactLoading from 'react-loading';
import { Link, Outlet, Route, Routes, useOutletContext } from "react-router-dom";
import { Card } from "./card";


//TODO search
export class MovieDetails {


  name:string|undefined;
  rating:number;
  description:string;
  category:string;
  actors:string[];
  year:Date;
  id:number;
  image:string;
  populalarity!: number;
  voteAverage!: number;
  voteCount!: number;
  inCart:boolean;
  inWatchList!:boolean;



  constructor(name:string|undefined,rating:number,description:string,category:string,actors:string[],year:Date,image:string,id:number) {
    this.name=name;
    this.rating=rating;
    this.description=description;
    this.category=category;
    this.actors=actors;
    this.year=year;
    this.image="http://image.tmdb.org/t/p/w500"+image;
    this.id=id;
    this.inCart=false;
    this.inWatchList=false;
  }

  getExtraInfo(){

    return this.id
  }
IsInWatchList(Movies:MovieDetails[]){

  for (let i = 0; i < Movies.length; i++) {
    if(this===Movies[i]){
      return true
    }

  }

  return false;

}

toogleFromWatchlist(){
  this.inWatchList=!this.inWatchList;
}

  setVotingAverage(votingAverage:number){
    this.voteAverage=votingAverage;

  }
setVoteCount(voteCount:number){

  this.voteCount=voteCount;
}

}

const fetch = require('node-fetch');

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzVkMWY5MjExNDNkMTBkNTkwMTQzZWIyZGNjMWMyYyIsIm5iZiI6MTcyNTkxMDI1MS40NTg0MjYsInN1YiI6IjY2ZGVjMjY3NDBmZDc4MDkxODA0NjRhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dhNZYE6TtDoWWikZbskJffk5SZxlSbGCn0Nl8Fc6140'
  }
};
interface IShop{
  cardMove:any;
  toogleWatchList:any;
  Watchlist:MovieDetails[];

}
export function Shop({cardMove,toogleWatchList,Watchlist}:IShop) {

  const [loading, setloading] = useState(true);

  const [movieCollection, setmovieCollection] = useState([new MovieDetails("power",8,"Goodmovie","spider",["kanye","west"],new Date("2024"),"",0)]);

  async function GetTrendingMovies() {

    let movies=fetch(url,options);



    let response= await movies;


    return response.json();





  }

  useEffect(() => {

    try {
      let movies=GetTrendingMovies();
      let moviesArray:MovieDetails[]=[];




      movies.then((resolve)=>{



            resolve.results.forEach((movie: {
              vote_count: number; original_title: string; vote_average: number; overview: string; release_date: string | number | Date; backdrop_path:string;id:number
})=>{
            let newMovie=new MovieDetails(movie.original_title,movie.vote_average,movie.overview,"movie",["kanye","west"],new Date(movie.release_date),movie.backdrop_path,movie.id)
              newMovie.setVotingAverage((movie.vote_average));
              newMovie.setVoteCount(movie.vote_count)
              moviesArray.push(newMovie);
            })

            setmovieCollection(moviesArray);
            setloading(false)








        })

      }
       catch (error) {
            alert(error)
          }


    return () => {

    };
  }, []);


  return loading?<div className="flex flex-col h-screen justify-center items-center"><Loading type={"bars"} color={"red"}/></div>:<BestOfAction movies={movieCollection} cardMove={cardMove} toogleWatchlist={toogleWatchList} MovieList={Watchlist}/>

}

function BestOfAction({movies,cardMove,toogleWatchlist,MovieList}:IBestofAction){



  return(
  <div className="grid grid-cols-4 grid-rows-6 gap-y-20">
    {movies.map(movie=> <MovieCard movie={movie} cardMove={cardMove} manageWatchlist={toogleWatchlist} MovieList={MovieList} />)}
  </div>

  )
}
interface IBestofAction{

  movies:MovieDetails[];
  cardMove:any;
  toogleWatchlist:any;
  MovieList:MovieDetails[];
}

interface IMovieCard{
  movie:MovieDetails;
  cardMove:any;
  manageWatchlist:any;
  MovieList:MovieDetails[];

}
type movieOutlet={
  movie:MovieDetails
}
export function MovieCard({movie,cardMove,manageWatchlist,MovieList}:IMovieCard) {

  const [Watched, setWatched] = useState(movie.inWatchList);

  function toogleWatchlist() {

   manageWatchlist(movie);


  }

  return(

    <div className="p-8 h-36 transition-all duration-75 ease-in-out hover:scale-105 card">


      <Link to={`card/${movie.name}`} >
      <Outlet context={{movie} satisfies movieOutlet }/>

      <img src={movie.image} alt="" className=" rounded-md" onClick={()=>cardMove(movie)} />
      </Link>



<div className=" text-white gap-3 p-2 relative -top-16 flex h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60
  ">




<div>
  <h1 className="font-bold text-xl">{movie.name}</h1>
  <p className="text-sm">{movie.category}</p>

</div>

<div className="flex justify-end items-center gap-1">
  <p className="text-2xl opacity-50 gap-3">|</p>
  <div className="flex gap-1 items-center justify-center">
    <StartCategoryIcon/>
    <p>{movie.rating}</p>
  </div>
</div>
      </div>
</div>



  )

}

function Watch() {
  return(
    <div>
      <button>
         <View/>
        </button>
        <button>Watch</button>
    </div>
  )

}

function Stars({numberOfStars}:Stars) {

  let StarsCollection:ReactElement[]=[];
  const intergerConversion=Math.floor(numberOfStars);

  for (let i = 0; i < intergerConversion; i++) {
    StarsCollection.push(<StartCategoryIcon/>);


  }
  return(
    <div>

  {    StarsCollection}

    </div>


  )

}

interface Stars{
  numberOfStars:number
}
export const Loading = ({ type, color }:ILoading) => (
  <div className="flex flex-col justify-center items-center h-full w-full">
    <ReactLoading type={type} color={color} height={120} width={130} />
    <h2 className="font-bold text-2xl">Fetching</h2>
  </div>
);

interface ILoading{
  type:any;
  color:string;
}

function Alert(){
  //TODO alertNotification
useEffect(() => {
  let alert=document.getElementById("alert") as HTMLDialogElement;
  alert.show();

  setTimeout(() => {
    alert.close();
  }, 3000);
  return () => {

  };
}, []);
  return(
    <dialog id="alert" className=" flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span className="sr-only">Info</span>
  <div>
    <span className="font-medium">Success alert!</span> Change a few things up and try submitting again.
  </div>
</dialog>
  )
}

export function useMovie(){
  return useOutletContext<movieOutlet>()
}