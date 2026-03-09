"use client";

import Link from "next/link";
import { CocktailT } from "../types/cocktail";
import "./style.css";

type Params = {
  cocktail: CocktailT;
};

export const Cocktail = ({ cocktail }: Params) => {
  return (
    <Link href={`/cocktail/${cocktail.idDrink}`} className="link">
      <div className="card">
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <div>
          <h2>{cocktail.strDrink}</h2>
        </div>
      </div>
    </Link>
  );
};