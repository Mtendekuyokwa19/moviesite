import { User } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { movieFetch, SearchInput } from "./components/home";

export function Layout({searchQuery,cartitems}:setSearchQuery) {

return(
  <>
  <nav className="flex list-none px-8 py-4 justify-center gap-16 h-full w-full bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border-b-2 z-10 border-gray-100 sticky top-0">
    <li>
      <button>
        <h1>

        <Link to="/">STREAMSAFE</Link>
        </h1>
      </button>

    </li>

    <div className="flex gap-16">
        <li className="ml-28">
        <Link to="/">Home</Link>
    </li>
    <li>

        <Link to="/Shop">Shop</Link>
    </li>

    <li>
        <Link to="/Cart">Cart
        {cartitems>0?<sup className="text-white p-2 rounded-full font-bold bg-lime-900">{cartitems}</sup>:<span></span>} </Link>
    </li>

    <li>
      <Link to={"/WatchList"}>WatchList</Link>
    </li>
    </div>

    <div className="flex gap-10">


         <Link to="/search">   <SearchInput setQuery={searchQuery}/></Link>
      <button>
        <User/>
      </button>
    </div>

  </nav>
  <Outlet/>
  </>
)

}

interface setSearchQuery{
  searchQuery:any;
  cartitems:number;
}
