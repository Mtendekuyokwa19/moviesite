import { Link } from "react-router-dom"
import { MovieDetails } from "./shop"
import { StartCategoryIcon } from "./svg";
import { Chart } from "chart.js";




import React, { PureComponent } from 'react';
import {  Pie, Legend, Tooltip} from 'recharts';
import { PieChart,  Sector, Cell, ResponsiveContainer } from 'recharts';


import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,} from 'recharts';


import { LineChart, Line, XAxis, YAxis, CartesianGrid} from 'recharts';
import { runInThisContext } from "vm";
import { type } from "os";





export  function WatchList({movieset,RemoveFromWatchlist,cartitems}:Iwatchlist){
   let panda=new DataForVotes("panda",200);
    let kanye=new DataForVotes("power",200);
     let yeezy=new DataForVotes("yeezy",800);
      let rizz=new DataForVotes("extacy",100);
   const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

  return(
   <div className="grid grid-cols-6 gap-2 overflow-hidden">

   <Sidebar movieset={[]} RemoveFromWatchlist={undefined} cartitems={cartitems}/>
   <div className="flex w-full col-start-2 col-span-5  p-4">
      <div className="flex flex-col gap-1">
<StatisticsOnVotes votes={[panda,yeezy,kanye,rizz]}/>
<div className="flex flex-col gap-2 overflow-y-auto">
   <h1 className="font-bold text-left">Saved Playlist</h1>

   {movieset.length>0?movieset.map(movie=><TinyCard movie={movie}/> ): <div><h1 className="font-bold">Watchlist Is Empty</h1> </div> }
</div>
      </div>


   <SecondGraph/>

   </div>
   </div>
  )
}

interface Iwatchlist{
  movieset:MovieDetails[];
  RemoveFromWatchlist:any;
  cartitems:number;
}

function Sidebar({cartitems}:Iwatchlist){

  return(
    <div>


<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span className="sr-only">Open sidebar</span>
   <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
   <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" className="    w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium py-10">
         <li>
            <Link to="/watchList" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
               </svg>
               <span className="ms-3">Dashboard</span>
            </Link>
         </li>
         <li>
            <Link to="/Shop" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Shop</span>
               <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>
            </Link>
         </li>
         <li>
            <Link to="/Cart" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
               </svg>
               <span className="flex-1 ms-3 whitespace-nowrap">Cart</span>
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{cartitems}</span>
            </Link>
         </li>

      </ul>
   </div>
</aside>

<div className="p-4 sm:ml-64">

</div>
    </div>

  )
}

interface ITinyCard{
   movie:MovieDetails;
}
function TinyCard({movie}:ITinyCard) {


   return(
      <div className="flex gap-3 border border-slate-400 rounded-lg p-2 ">
         <div >
            <img src={movie?.image} alt="" className="h-32 rounded-lg" />
         </div>

         <div className="flex flex-col w-full">
            <div>
               <h1 className="font-bold text-lg">{movie.name}</h1>
               <p className="text-sm">{movie.description.split("").length>120?movie.description.split("").splice(0,120).join(""):movie.description}</p>
               <div className="flex gap-1">
               <StartCategoryIcon/>
               <p>{movie.rating}</p>
               </div>

            </div>
            <button className="justify-self-end self-end py-2 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
               Remove
            </button>
         </div>
      </div>
   )

}


function StatisticsOnVotes({votes}:votingList) {

      return(
         <div className=" bg-slate-200 flex flex-col justify-center items-center rounded-3xl">
            <div>
               <VotesCard votes={votes}/>

            </div>
            <h1 className="text-black font-bold ">Distribution Of votes</h1>

         </div>
      )
}



const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

class DataForVotes {
   name: string;
   value: number;
   constructor(movieName:string,votes:number) {
      this.name=movieName;
      this.value=votes;

   }
}

type votingList={
   votes:DataForVotes[];
}
export default class VotesCard extends PureComponent <votingList>{







  render() {
   const {votes}=this.props;
    return (

        <PieChart width={330} height={220}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={votes}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>

    );
  }
}

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export  class SecondGraph extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (

        <LineChart
          width={600}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>

    );
  }
}
