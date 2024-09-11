import { url } from "inspector";
import { MovieDetails } from "./shop";
import { ChooseHeroBtns } from "./home";
import { BuyNowIcon } from "./svg";


export function Card({movie}:ICard) {
let backdrop=movie.image;


  return (
    <div style={{
       backgroundImage:`url(${backdrop})`,


    }}  className="h-screen   flex flex-col ">

<div className="flex flex-col justify-center items-center h-screen">

    <MovieCard/>
</div>
    </div>
  )

}




interface ICard{

  movie:MovieDetails;
}

function MovieCard() {

  return(
    <div className="w-1/2 h-3/4 ">
      <div className="h-2/5 overflow-hidden">

        <img src={require("./img/mandalorian.jpg")}  className="w-screen" alt="" />
      </div>

        <div className="flex bg-white z-10 h-3/5 justify-evenly flex-1  p-5">
          <MovieResearch/>

        </div>
    </div>
  )

}



function MovieResearch(){

  return(
    <div className="flex flex-col gap-4">
    <div className="bg-white flex flex-col gap-2">

    <h1 className="text-3xl font-bold">The Lion King (1994)</h1>
    <p className="font-sans text-sm">G| 1h28min| Animation, Adventure, Drama| 24 June (USA)</p>
    </div>

    <p className="text-sm ">The book is designed to be easy to understand and accessible to anyone looking to learn JavaScript. It provides a step-by-step gentle guide that will help you understand how to use JavaScript to create a dynamic application.

Here's my promise: You will actually feel like you understand what you're doing with JavaScript.

Until next time!</p>

    <div className="bg-white flex flex-col gap-2 text-sm">
      <p>Directors:Roger Allers, Rob Minkoff</p>
      <p>Writers:Irene Mecchi (Screenplay)</p>
      <p>Stars:Matthew Broderic, Jeremy Irons</p>
    </div>
    <MovieButton/>
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


function MovieButton() {


  return(
    <div className="flex gap-2 ">
     <button className="flex items-center justify-center bg-green-700 text-white flex-1  rounded-md gap-2 hover:bg-emerald-700 ">
      <BuyNowIcon/>
     <p>Buy Now</p>
     </button>
     <button className="flex items-center justify-center  text-black py-4  flex-1 rounded-md gap-2 border-2 border-gray-950 hover:bg-slate-200 ">
     <p>Add to Watchlist</p>
       </button>
    </div>

  )

}

class Card {
  title:string;
  Year:string;
  Rated:string;
  Runtime:string;
  genre:string;
  director:string;
  writer:string;
  Actors:string;
  plot:string;
  language:string;
  country:string;
  poster:string;
metascore:number;
imdbRating:number;
imdbvotes:number;
BoxOffice:number |string;
  constructor(title:string,Actors:string,BoxOffice:number|string,Rated:string,Runtime:string,Year:string,country:string,director:string,genre:string,writer:string,metascore:number,imdbRating:number,imdbvotes:number,language:string,plot:string,) {
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



  }
}