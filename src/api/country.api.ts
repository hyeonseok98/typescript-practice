import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1/all";

export const countryApi = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const data = response.data;
    return data;
  } catch (error) {
    const typedError = error as Error;
    console.error(
      "Country Data를 가져오는 도중 오류가 발생했습니다:",
      typedError.message
    );
  }
};
