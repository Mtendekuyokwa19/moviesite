import { User } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { SearchInput } from "./components/home";

export function Layout() {

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
      Cart
    </li>
    </div>

    <div className="flex gap-10">


         <Link to="/Shop">   <SearchInput/></Link>
      <button>
        <User/>
      </button>
    </div>

  </nav>
  <Outlet/>
  </>
)

}