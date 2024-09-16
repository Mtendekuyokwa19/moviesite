import React, { useState } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './components/home';
import { MovieDetails, Shop } from "./components/shop";
import { Layout } from './Layout';
import { Cart } from './components/cart';
import { Card } from './components/card';

export default function App() {
  let movie:MovieDetails[]=[];
const [routeCard, setrouteCard] = useState(new MovieDetails("Jack",89,"panda","jack",["String","string"],new Date(),"",0) );
const [catalog, setCatalog] = useState(movie);
function cardMove(movie: React.SetStateAction<MovieDetails>) {

  setrouteCard(movie)
}

function AddtoCart(item:MovieDetails) {

  setCatalog([...catalog,item])

}
function removeFromCart(movie:MovieDetails){
  let collection=catalog;
  collection.splice(collection.indexOf(movie),1)
  console.log(collection)
  setCatalog([...collection]);

}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop cardMove={cardMove} />} />
           <Route path="Card" element={<Card movie={routeCard} AddtoCart={AddtoCart} />} />
            <Route path="Cart" element={<Cart catalog={catalog} cardMove={removeFromCart}  />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
