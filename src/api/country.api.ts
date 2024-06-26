import axios from "axios";
import { Country } from "../types/country.type";

const BASE_URL = "https://restcountries.com/v3.1/all";

export const countryApi = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(BASE_URL);
  const data = response.data;
  return data;
};
