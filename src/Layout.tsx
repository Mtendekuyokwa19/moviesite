import { User } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { movieFetch, SearchInput } from "./components/home";
import { useState } from "react";
import { MenuIcon } from "./components/svg";

export function Layout({searchQuery,cartitems}:setSearchQuery) {
const [ShowMenu, setShowMenu] = useState(true);
function toogleMenu() {
 setShowMenu(!ShowMenu);
}
return(
  <>
  <nav className="flex items-center list-none sm:px-8 p-3 sm:py-4 justify-between sm:justify-center gap-4 sm:gap-16 h-full w-full bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 border-b-2 z-10 border-gray-100 sticky top-0">
    <li>
      <button>
        <h1 className="font-bold text-2xl">

        <Link to="/">Str</Link> </h1> </button>

    </li>

    <div className="hidden gap-16 md:flex sm:flex">
        <li className="sm:ml-28">
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

    <div className="flex flex-1 h-full sm:gap-10 lg:hidden">


         <Link to="/search">   <SearchInput setQuery={searchQuery}/></Link>
      <button className="hidden">
        <User/>
      </button>
    </div>
    <div>
      <button onClick={toogleMenu} className="sm:hidden md:hidden">

      <MenuIcon/>
        </button> </div>
    <div hidden={ShowMenu} className=" w-screen p-4 absolute  top-0 bg-black text-white   h-screen left-0 ">
      <div className="flex justify-end">
        <button onClick={toogleMenu} className="bg-white w-7 rounded-full text-black font-bold flex justify-center"><div>
          x
          </div></button>
      </div>
      <div className=" p-14 gap-8 text-xl font-bold flex flex-col justify-center items-center">

      <li>

         <button onClick={toogleMenu}>
          <Link to="/">Home</Link>

          </button> </li>
      <li>

        <button onClick={toogleMenu}>
          <Link to="/Shop">Shop</Link>

          </button></li>
      <li> <button onClick={toogleMenu}>
        <Link to="/Cart">Cart
        {cartitems>0?<sup className="text-white p-2 rounded-full font-bold bg-lime-900">{cartitems}</sup>:<span></span>} </Link>

        </button> </li>
      <li>
<button onClick={toogleMenu}>


        <Link to={"WatchList"}>Watchlist</Link>
</button>
      </li>
    </div>
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
