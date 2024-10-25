import React, { useState } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './components/home';
import { MovieDetails, Shop } from "./components/shop";
import { Layout } from './Layout';
import { Cart } from './components/cart';
import { Card } from './components/card';
import Search from './components/search';
import { WatchList } from "./components/watchlist";
import { Error } from './components/error';
import MovieDetailsfetcher from './components/movieDetailsfetcher';


export default function App() {
  const [menuModal, setmenuModal] = useState(false);

  function toogleMenu() {
setmenuModal(!menuModal)
  }


  let movie:MovieDetails[]=[];
  let watchlist:MovieDetails[]=[];
const [routeCard, setrouteCard] = useState(new MovieDetails("Jack",89,"panda","jack",["String","string"],new Date(),"",0) );
const [catalog, setCatalog] = useState(movie);
const [SearchQuery, setSearchQuery] = useState("");
const [Watchs, setWatchs] = useState<MovieDetails[]>(watchlist);
function cardMove(movie: React.SetStateAction<MovieDetails>) {

  setrouteCard(movie)
}

function AddtoCart(item:MovieDetails) {

  setCatalog([...catalog,item])

}
function removeFromCart(movie:MovieDetails){
  let collection=catalog;
  collection.splice(collection.indexOf(movie),1)

  setCatalog([...collection]);

}

function AddtoWatchlist(movie:MovieDetails) {
movie.toogleFromWatchlist()
  setWatchs([...Watchs,movie])
console.log(Watchs)

}
function RemovefromWatchlist(movie:MovieDetails) {
  let movieList=Watchs;
  movie.toogleFromWatchlist()
  movieList.splice(movieList.indexOf(movie),1);
  setWatchs([...movieList])

}


function ToogleWatchlist(movie:MovieDetails,IsInWatchList:boolean){
console.log(Watchs)
  if(IsInWatchList){
    RemovefromWatchlist(movie)
    return
  }
  AddtoWatchlist(movie)


}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout  searchQuery={(movieName: React.SetStateAction<string>) => setSearchQuery(movieName)} cartitems={catalog.length}  />}>
          <Route index element={<Home />} />
          <Route path="shop"
          errorElement=<Error/>

          children={[
            <Route index={true} element={<Shop cardMove={cardMove} toogleWatchList={ToogleWatchlist} Watchlist={Watchs} />} />,
            <Route path={"card/:name"} element={<MovieDetailsfetcher AddtoCart={AddtoCart} toogleWatchlist={ToogleWatchlist} movies={Watchs} />} />
          ]}

          />

            <Route path="Cart" element={<Cart catalog={catalog} cardMove={removeFromCart}  />} />
            <Route path="WatchList" element={<WatchList movieset={Watchs} removeFromWatchlist={RemovefromWatchlist} cartitems={catalog.length}/>} />
            <Route path="Search"

            children={

              [
                <Route index={true} element={<Search search={SearchQuery} cardMove={cardMove} toogleWatchlist={ToogleWatchlist}/>} />,
                <Route path={"card/:name"} element={<MovieDetailsfetcher AddtoCart={AddtoCart} toogleWatchlist={ToogleWatchlist} movies={Watchs} />} />
              ]
            }

            />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
