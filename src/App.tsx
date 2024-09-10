import React, { useState } from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './components/home';
import { MovieDetails, Shop } from "./components/shop";
import { Layout } from './Layout';
import { Card } from './components/card';

export default function App() {
const [routeCard, setrouteCard] = useState(new MovieDetails("Jack",89,"panda","jack",["String","string"],new Date(),"") );

function cardMove(movie: React.SetStateAction<MovieDetails>) {

  setrouteCard(movie)
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop cardMove={cardMove} />} />
              <Route path="Card" element={<Card movie={routeCard} />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
