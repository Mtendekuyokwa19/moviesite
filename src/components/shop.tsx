import { ReactElement, useEffect, useState } from "react"
import { AddToWatchList, StartCategoryIcon, View } from "./svg"
import { resolve } from "path";


class MovieDetails {

  name:string;
  rating:number;
  description:string;
  category:string;
  actors:string[];
  year:Date;
  image:string;

  constructor(name:string,rating:number,description:string,category:string,actors:string[],year:Date,image:string) {
    this.name=name;
    this.rating=rating;
    this.description=description;
    this.category=category;
    this.actors=actors;
    this.year=year;
    this.image="http://image.tmdb.org/t/p/w500"+image;
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

export function Shop() {

  // TODO url fetch movies

  const [movieCollection, setmovieCollection] = useState([new MovieDetails("power",8,"Goodmovie","spider",["kanye","west"],new Date("2024"),"")]);

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


          console.log(resolve.results)
            resolve.results.forEach((movie: { original_title: string; vote_average: number; overview: string; release_date: string | number | Date; backdrop_path:string })=>{
              moviesArray.push(new MovieDetails(movie.original_title,movie.vote_average,movie.overview,"movie",["kanye","west"],new Date(movie.release_date),movie.backdrop_path));
            })

            setmovieCollection(moviesArray);








        })

      }
       catch (error) {
            alert(error)
          }


    return () => {

    };
  }, []);


  return(
    <BestOfAction movies={movieCollection} />
  )

}

function BestOfAction({movies}:IBestofAction){
  console.log(movies)


  return(
  <div className="grid grid-cols-4 grid-rows-5 gap-y-20">
    {movies.map(movie=> <MovieCard movie={movie} />)}
  </div>

  )
}
interface IBestofAction{

  movies:MovieDetails[];
}

interface IMovieCard{
  movie:MovieDetails;

}
function MovieCard({movie}:IMovieCard) {
  const [watched,setWatched]=useState(true)

  function toogleWatchlist() {
   setWatched(!watched);

  }

  return(
    <div className="p-8 h-32 transition-all duration-75 ease-in-out hover:scale-105 card">
      <img src={movie.image} alt="" className=" rounded-md" />


<div className=" text-white gap-3 p-2 relative -top-16 flex h-full w-full bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60
  ">



<div className="flex  justify-center items-center" onClick={toogleWatchlist}>


  <AddToWatchList watched={watched} />
</div>
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