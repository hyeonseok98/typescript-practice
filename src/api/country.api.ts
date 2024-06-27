import axios from "axios";
import { Country } from "../types/country.type";

const BASE_URL = "https://restcountries.com/v3.1/all";

export const countryApi = async (): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(BASE_URL);
    const data = response.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        "Country Data를 가져오는 도중 오류가 발생했습니다:",
        error.message
      );
    }
    return [];
  }
};
