import { useEffect } from "react";
import { MovieCard, MovieDetails } from "./shop";
import { type } from "os";

export function Cart({catalog,cardMove}:Cart) {



  return(
    <div className="flex flex-col items-center ">

    <div className="flex justify-center w-4/5">
   <MovieList catalog={catalog}/>

    </div>
    <CheckOut />
    </div>
  )

}
interface Cart{
  catalog:MovieDetails[];
  cardMove:any;
}

interface Imovielist{
  catalog:MovieDetails[];
}

function MovieList({catalog}:Imovielist) {



  return(


<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 my-5">
    <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Cart Items</h5>

   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {catalog.map(movie=><List movie={movie}/>)}

        </ul>
   </div>
</div>

  )


}
interface movie{movie:MovieDetails;};


function List({movie}:movie) {


return(
    <li className="py-3 sm:py-4 flex flex-col justify-center items-start">
                <div className="flex items-center justify-between w-full px-4">
                    <div className="flex-shrink-0">
                        <img className="w-16 h-16 rounded-lg" src={movie.image} alt="Neil"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {movie.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {movie.rating}
                        </p>
                    </div>
                    <div className="inline-flex justify-self-end items-center text-base font-semibold text-gray-900 dark:text-white">
                      {"K"+Math.floor(movie.rating*3)}
                    </div>
                </div>
<button type="button" className=" self-end  py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Remove</button>
            </li>
)

}


function CheckOut() {

  return(

    <button type="button" className=" justify-self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
Checkout
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</button>
  )
}