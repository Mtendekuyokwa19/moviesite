import { User } from "lucide-react";
import { Outlet, Link } from "react-router-dom";
import { SearchInput } from "./components/home";

export const Jack = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export function Layout() {

return(
  <>
  <nav className="flex list-none px-8 py-4 justify-center gap-16">
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
      Watchlist
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