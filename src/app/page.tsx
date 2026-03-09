"use client";

import { useEffect, useState } from "react";
import { Cocktail } from "../components/cocktail";
import { CocktailT } from "../types/cocktail";
import { getRandomCocktail, getCocktailsByName } from "../lib/api/coctel";
import "./page.css";
import { AxiosError } from "axios";
import Link from "next/link";

const Home = () => {
  const [cocktails, setCocktails] = useState<CocktailT[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const cocktailsIniciales = async () => {
    setLoading(true);

    getCocktailsByName("margarita")
      .then((res) => {
        setCocktails(res);
      })
      .catch((e: AxiosError) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const searchCocktails = async () => {
    setLoading(true);

    getCocktailsByName(name)
      .then((res) => {
        setCocktails(res);
      })
      .catch((e: AxiosError) => {
        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    cocktailsIniciales();
  }, []);

  return (
    <div className="container">
      <h1>Buscador de Cocktails</h1>

      <Link href="/cocktailAleatorio">Dime algo bonito</Link>
      
      <div className="search">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Busca un cocktail"
        />
        <button onClick={searchCocktails}>Search</button>
      </div>

      {loading && <h2>Loading...</h2>}
      {error && <h3>{error}</h3>}
      {!loading && !error && cocktails.length === 0 && <h3>No hay resultados</h3>}

      {!loading &&
        !error &&
        cocktails.map((c) => (
          <Cocktail key={c.idDrink} cocktail={c} />
        ))}
    </div>
  );
};

export default Home;