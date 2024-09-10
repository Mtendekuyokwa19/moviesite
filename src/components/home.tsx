import { useState ,useEffect, SetStateAction} from "react";
import { BuyNowIcon, MoviesCategoryIcon, Remove, SearchIcon, StartCategoryIcon, User, View } from "./svg"
import "./home.css"
import { Loading } from "./shop";
import ReactLoading from "react-loading";

let Logos:company[]=[

]

class company {
  link:any;
  name:string;
  constructor(link:any,name:string) {
    this.link=link;
    this.name=name;

    Logos.push(this);
  }
}


const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=4f9a8426';

function movieFetch(movie:string):string {
  let url=`https://www.omdbapi.com/?t=${movie}&apikey=843f2c83`

  return url
}


let marvel:company=new company(require("./img/marvel.png"),"marvel")
let hulu:company=new company(require("./img/hulu.png"),"hulu")
let disney:company=new company(require("./img/disney.png"),"disney")
let nationalG:company=new company(require("./img/nationalGeorgraphic.png"),"nationalG")
let hbo:company=new company (require("./img/hbo.png"),"hbo")
let netflix:company=new company (require("./img/netflix.png"),"netflix")

export function Home() {
  const [movieCollection, setmovieCollection] = useState([new MovieTrending("jack",2,8,"jack","jack","jack")]);
  const [loading, setloading] = useState(true);
  async function getMovies() {
    let movies:string[]=["Kanye","Kung fu Panda","Jesus","Attack on titan"]
    let results:any[]=[]
    try {
    for (let i = 0; i < 4; i++) {
   const response = await fetch(movieFetch(movies[i]));
	const result:any = await response.json();

  results.push(result)

    }



} catch (error) {
	console.error(error);
}

console.log(results)
return results;
  }

  function manageCollection(collections:any) {
    setmovieCollection(collections)

  }

  useEffect(() => {

    let movies:Promise<any>=  getMovies();
    let moviesCollections:MovieTrending[]=[];

    movies.then((resolve)=>{

        for (let index = 0; index < resolve.length; index++) {
       moviesCollections.push(new MovieTrending(resolve[index].Title,index+1,parseFloat(resolve[index].imdbRating),resolve[index].Genre,resolve[index].Type,resolve[index].Poster ))

      }

      setloading(false)
    manageCollection(moviesCollections);


    })







    return () => {

    };
  }, []);
  return(
    <div className="flex flex-col gap-4">

    <Hero/>

    <div className="flex gap-2 p-12">
      {Logos.map(logo=><CompaniesInvolved url={logo.link} />)}

    </div>

     <div className="flex flex-col gap-4">
      <h2  className="font-bold text-2xl p-6 text-center">Trending Watches</h2>

      <div className="flex gap-6 overflow-hidden justify-evenly p-8">

              {loading?<AnimationLoading/>:movieCollection.map(movie=> <Trending key={movie.rating} name={movie.name.toString()} position={movie.position} rating={movie.rating} type={movie.type} link={movie.link} category={movie.category}/>)}
         </div>
    </div>
  <TailwindStats/>
    <Accordian movie={movieCollection}/>
<Footer/>
    </div>
  )

}

export function NavBar() {

return(
  <nav className="flex list-none px-8 py-4 justify-center gap-16">
    <li>
      <button>
        <h1>
          STREAMSAFE
        </h1>
      </button>

    </li>

    <div className="flex gap-16">
        <li className="ml-28">
      Home
    </li>
    <li>
      Shop
    </li>
    <li>
      Watchlist
    </li>
    <li>
      Cart
    </li>
    </div>

    <div className="flex gap-10">

        <SearchInput/>
      <button>
        <User/>
      </button>
    </div>

  </nav>
)

}

 export function SearchInput() {

const [toogleSearch, settoogleSearch] = useState(false);

function toogle() {
  if(toogleSearch===true){
    settoogleSearch(false)
    return
  }
  settoogleSearch(true)
}
let inputClassname="  bg-slate-100 rounded-md outline outline-offset-2 outline-1 ";
  return(
    <div className="flex gap-2">
      <input type="text" className={(toogleSearch?"hidden"+inputClassname:"flex"+inputClassname)} placeholder="search"/>
       <button className="flex" onClick={toogle}>
        <SearchIcon/>


      </button>

    </div>
  )

}

function Hero(){

  let descriptions=["2h40m","2022","Fantasy","Actions"]
  let explanation="The Mandalorian is actually a television series, not a movie. It premiered on Disney+ in November 2019 and is set in the Star Wars universe. Created by Jon Favreau, the show follows the story of a lone bounty hunter named Din Djarin, who is part of the Mandalorian culture."


  return(
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 py-36 px-10  flex flex-col gap-3 hero overflow-hidden">



      <div>
        <button className="bg-black text-white px-2 py-1 rounded-lg">Season 3</button>
      </div>
        <h2 className="text-4xl font-bold text-white animate-in slide-in-from-left-96"> The Mandolorian</h2>

        <div>
          <div className="flex gap-1">{descriptions.map(description=> <li className="list-none font-thin text-slate-200">{description+"."}</li>)}</div>

           <p className="w-1/2 text-white">
        {explanation}
      </p>
        </div>

        <ChooseHeroBtns/>

    </div>
  )
}

function ChooseHeroBtns() {

  return(
    <div className="flex gap-4">
      <button className="flex items-center bg-green-700 text-white py-4 px-9 rounded-md gap-2 transition delay-150 duration-100 ease-out hover:bg-transparent hover:border hover:border-gray-50 border border-green-700">

        <BuyNowIcon/>

       <p>Buy Now</p>
        </button>
      <button className="flex items-center border border-gray-50 text-white py-4 px-9  transition delay-150 duration-100 ease-out rounded-md gap-2 hover:bg-green-700 ">Add Watchlist</button>
    </div>
  )

}

function CompaniesInvolved({url}:ICompaniesInvolved) {

  return(
    <div className="bg-slate-200 p-14 rounded-md w-64 flex justify-center items-center grayscale  hover:grayscale-0">

      <img  className="h-18 " src={url} alt="company"  />
    </div>
  )

}

interface ICompaniesInvolved{

  url:any
}



function Trending({ name,position,rating,type,category,link}:MovieTrendingI) {

  console.log(name,rating)

  return(
      <div className="flex gap-2">
        <p className="font-bold text-6xl">{position}</p>

        <div className="flex gap-2">
          <img src={link} className="h-36 rounded-2xl" alt="" />
          <div className="flex flex-col gap-2">
            <button className="border border-gray-600 rounded-md font-mono text-sm" >PG-13</button>
            <p className="font-bold text-lg">{name}</p>

            <div className="flex gap-1">
              <MoviesCategoryIcon/>

              <p>{type}</p>
            </div>
            <div className="flex gap-1">
              <div><StartCategoryIcon/></div>
              <p>{rating+" |"}</p>
              <p>{category}</p>
            </div>
          </div>
        </div>
      </div>
  )
}

interface MovieTrendingI{

  name:string;
  position:number;
  rating:number;
  type:string;
  category:string;
  link:string

}
class MovieTrending{
  name:string;
  position:number;
  rating:number;
  type:string;
  category:string;
  link:string;

  constructor(name:string,position:number,rating:number,type:string,category:string,link:string){

    this.name=name;
    this.position=position;
    this.rating=rating;
    this.type=type;
    this.category=category;
    this.link=link;


  }
}


function Testimonials(){



  return (
    <>

    <section className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-10 mx-auto">
        <div className="mt-6 md:flex md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    What our clients are saying
                </h1>

                <div className="flex mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>
            </div>

            <div className="flex justify-between mt-8 md:mt-0">
                <button title="left arrow" className="p-2 mx-3 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button title="right arrow" className="p-2 text-gray-800 transition-colors duration-300 border rounded-full rtl:-scale-x-100 dark:text-gray-200 dark:hover:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <section className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
            <div className="p-8 border rounded-lg dark:border-gray-700">
                <p className="leading-loose text-gray-500 dark:text-gray-400">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur a.”.
                </p>

                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>

                    <div className="mx-2">
                        <h1 className="font-semibold text-gray-800 dark:text-white">Robert</h1>
                        <span className="text-sm text-gray-500 dark:text-gray-400">CTO, Robert Consultency</span>
                    </div>
                </div>
            </div>

            <div className="p-8 bg-blue-500 border border-transparent rounded-lg dark:bg-blue-600">
                <p className="leading-loose text-white">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur a.”.
                </p>

                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-blue-200" src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80" alt=""/>

                    <div className="mx-2">
                        <h1 className="font-semibold text-white">Jeny Doe</h1>
                        <span className="text-sm text-blue-200">CEO, Jeny Consultency</span>
                    </div>
                </div>
            </div>

            <div className="p-8 border rounded-lg dark:border-gray-700">
                <p className="leading-loose text-gray-500 dark:text-gray-400">
                    “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quibusdam ducimus libero ad
                    tempora doloribus expedita laborum saepe voluptas perferendis delectus assumenda rerum, culpa
                    aperiam dolorum, obcaecati corrupti aspernatur a.”.
                </p>

                <div className="flex items-center mt-8 -mx-2">
                    <img className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 ring-4 ring-gray-300 dark:ring-gray-700" src="https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt=""/>

                    <div className="mx-2">
                        <h1 className="font-semibold text-gray-800 dark:text-white">Ema Watson </h1>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Marketing Manager at Stech</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</section>

    </>
  )
}

function Statistics() {
  let cards:Cards[]=[];
  class Cards implements Stat{
    number: number;
    product: string;

    constructor(number:number,product:string){

        this.number=number;
        this.product=product;

        cards.push(this)
    }


  }

  let Tickets=new Cards(6000,"Tickets");
  let Movies=new Cards(3452,"Movies")
  let Countries=new Cards(456,"Countries")



  return(
    <div className="flex  bg-sky-950 justify-evenly items-center">
      {cards.map(card=><StatisticsCard number={card.number} product={card.product}/>)}

    </div>
  )

}

function StatisticsCard({number,product}:Stat){
  // const [count, setcount] = useState(0);

  // useEffect(() => {
  //   while (count!==number) {
  //     setInterval(() => {
  //       setcount(count=>count+1)

  //     }, 200);

  //   }
  //   return () => {
  //     setcount(0)

  //   };
  // }, [count]);


  return(
  <div className="p-7 text-white  flex justify-start flex-col items-center " >
      <p className="text-2xl font-bold">{number+"+"}</p>
    <p className="text-start">{product}</p>

  </div>


  )
}

interface Stat{

  number:number;
  product:string;
}

function Accordian({movie}:Accordian) {
let accordianQueries:query[]=[];
const [movieshown, setmovieshown] = useState(0);
  class query {
    question:string;
    response:string;
    key:number;
    constructor(question:string,response:string) {
      this.question=question;
      this.response=response;
      this.key=response.split("")[0].charCodeAt(0)-92
      accordianQueries.push(this)

    }
  }

  let question1:query=new query("what is your return policy","you can return the disk after a maximum of five days");
  let question2:query=new query("Do I need to create an account to use the services","No, You do not need an account for our services.")
  let question3:query=new query("What is the most trending movie apart from the ones listed","Naruto")
  let question4:query=new query("Is this available on linux","Yes, we get alot of funding from the linux community")
  return(
    <div className="flex flex-col">
    <h2  className="font-bold text-2xl p-6 text-center">Frequently Asked Questions</h2>
      <div className="flex p-8 gap-3 justify-center ">



     <img src={movie[movieshown].link} alt="" className="h-1/2 rounded-md" />
         <div className="flex justify-center items-center flex-col">
    <div>
  {accordianQueries.map(query=><AccordianBar question={query.question} response={query.response} changemovie={(index:number)=>setmovieshown(3-index)} index={accordianQueries.indexOf(query)}/>)}
    </div>

    </div>

      </div>


    </div>
  )

}
interface Accordian{

  movie:MovieTrending[];

}

function AccordianBar({question,response,changemovie,index}:AccordianBar){
const [visibility, setvisibility] = useState("hidden");

function toogleShow() {
  if(visibility==="hidden"){

    return setvisibility("flex")
  }

  setvisibility("hidden")

}
return(
  <div className="border-t-2 border-gray-200 px-24 py-4 flex flex-col" onClick={toogleShow} >
    <div className="flex justify-between gap-10">

      <p className="text-lg">{question+"?"}</p>
      <button onClick={()=>{
        toogleShow();
        changemovie(index)
      }}>
      {visibility==="hidden"?<View/>:<Remove/>}
      </button>
    </div>
    <p className={"italic w-5/6 "+visibility}>{response}</p>
  </div>
)
}

interface AccordianBar{
  question:string;
  response:string;
  changemovie:any;
  index:number;
}

const links = [
  { name: 'About', href: '#' },
  { name: 'Watchlist', href: '#' },
  { name: 'Cart', href: '#' },

]
const stats = [
  { name: 'Official Backers', value: '12' },
  { name: 'Movie centers', value: '300+' },
  { name: 'Available Tickets', value: '40034+' },
  { name: 'Users', value: '87223+' },
]

export default function TailwindStats() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-24">

      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Get Movies</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
         Watch the latest movies and buy them. We are at the forefront of
        Metting your demands

          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

function Footer() {

  return(


<footer className="bg-white  shadow dark:bg-gray-900 ">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">

                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">STREAMSAFE</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>


                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">STREAMSAFE</a>. All Rights Reserved.</span>
    </div>
</footer>


  )

}

function AnimationLoading() {

  return(
    <div><LoadingAnimation type={"spin"} color={"red"} /></div>
  )

}

const LoadingAnimation = ({ type, color }:ILoading) => (
  <div className="flex flex-col justify-center items-center h-full w-full">
    <ReactLoading type={type} color={color} height={40} width={60} />

  </div>
);

interface ILoading{
  type:any;
  color:string;
}