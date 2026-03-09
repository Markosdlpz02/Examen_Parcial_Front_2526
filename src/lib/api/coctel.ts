import { api } from "./api";
import type { CocktailT } from "../../types/cocktail";

type CocktailsResponse = {
  drinks: CocktailT[] | null;
};

export const getRandomCocktail = async () => {
    const res = await api.get<CocktailsResponse>("/random.php")
    return res.data.drinks ? res.data.drinks[0] : null;
}

export const getCocktailsByName = async (name: string) => {
  const res = await api.get<CocktailsResponse>(`/search.php?s=${name}`);
  return res.data.drinks || [];
};

export const getCocktailById = async (id: number) => {
  const res = await api.get<CocktailsResponse>(`/lookup.php?i=${id}`);
  return res.data.drinks ? res.data.drinks[0] : null;
};