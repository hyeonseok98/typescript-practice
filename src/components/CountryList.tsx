import { useEffect, useState } from "react";
import { countryApi } from "../api/country.api";
import { Country } from "../types/country.type";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country[]>([]);

  useEffect(() => {
    const getCountryData = async () => {
      try {
        const data = await countryApi();
        const idAddedData = data.map((countryData: Country, index: number) => ({
          ...countryData,
          id: index,
        }));
        setCountryList(idAddedData);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };
    getCountryData();
  }, []);

  const handleAddFavortieCountry = (favoriteCountry: Country) => {
    setSelectedCountry((prevList) => [...prevList, favoriteCountry]);

    setCountryList(
      countryList.filter(
        (chosenCountry) => chosenCountry.id !== favoriteCountry.id
      )
    );
  };

  const handleRemoveFavortieCountry = (favoriteCountry: Country) => {
    setCountryList((prevList) => {
      const newList = [...prevList, favoriteCountry];
      return newList.sort((a, b) => a.id - b.id);
    });

    setSelectedCountry(
      selectedCountry.filter(
        (chosenCountry) => chosenCountry.id !== favoriteCountry.id
      )
    );
  };

  return (
    <main className="flex flex-col justify-start items-center h-screen ">
      <section className="w-5/6 mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mt-12 my-6">
          Favorite Countries
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCountry.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              onClick={() => handleRemoveFavortieCountry(country)}
              isActive={true}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center my-6">Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countryList.map((country, index) => (
            <CountryCard
              key={index}
              country={country}
              onClick={() => handleAddFavortieCountry(country)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CountryList;
