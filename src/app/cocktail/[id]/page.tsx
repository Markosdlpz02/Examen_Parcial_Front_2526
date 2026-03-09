"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCocktailById } from "../../../lib/api/coctel";
import { CocktailT } from "../../../types/cocktail";
import "./page.css";
import Link from "next/link";
import { AxiosError } from "axios";

const CocktailPage = () => {
  const { id } = useParams();

  const [cocktail, setCocktail] = useState<CocktailT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCocktailById(Number(id))
      .then((res) => {
        setCocktail(res);
      })
      .catch((e: AxiosError) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container">

      <div className="backButton">
        <Link href="/">Ir a la pagina principal</Link>
      </div>

      {loading && <h1>Loading...</h1>}
      {error && <h3>{error}</h3>}

      {cocktail && (
        <div className="detail">
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

          <div>
            <h1>{cocktail.strDrink}</h1>
            <p>Category: {cocktail.strCategory}</p>
            <p>Alcoholic: {cocktail.strAlcoholic}</p>
            <p>Glass: {cocktail.strGlass}</p>
            <p>Instructions: {cocktail.strInstructions}</p>

            <h2>Ingredients</h2>
            <p>{cocktail.strIngredient1} {cocktail.strMeasure1}</p>
            <p>{cocktail.strIngredient2} {cocktail.strMeasure2}</p>
            <p>{cocktail.strIngredient3} {cocktail.strMeasure3}</p>
            <p>{cocktail.strIngredient4} {cocktail.strMeasure4}</p>
            <p>{cocktail.strIngredient5} {cocktail.strMeasure5}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CocktailPage;