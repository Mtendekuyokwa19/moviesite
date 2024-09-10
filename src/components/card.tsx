import { url } from "inspector";
import { MovieDetails } from "./shop";


export function Card({movie}:ICard) {
let backdrop=movie.image;


  return (
    <div style={{
       backgroundImage:`url(${backdrop})`,


    }}  className="h-screen  grayscale">

    <h1>{movie.name}</h1>
    </div>
  )

}




interface ICard{

  movie:MovieDetails;
}


function MovieResearch(){

  return(
    <>
    <div>

    <h1>The Lion King (1994)</h1>
    <p>G| 1h28min| Animation, Adventure, Drama| 24 June (USA)</p>
    </div>

    <div>
      <p>Directors:Roger Allers, Rob Minkoff</p>
      <p>Writers:Irene Mecchi (Screenplay)</p>
      <p>Stars:Matthew Broderic, Jeremy Irons</p>
    </div>

    </>
  )
}

function Shooting(){

return(
  <div>
      <ShootingDetails title={""} description={""}/>

      <ShootingDetails title={""} description={""}/>


      <ShootingDetails title={""} description={""}/>

  </div>
)
}

function ShootingDetails({title,description}:IShootingDetails){

  return(
<>

 <div>
      <p>Runtime:</p>
      <h1>88min | 73 min</h1>
    </div>
</>
  )
}

interface IShootingDetails{
  title:string;
  description:string;
}