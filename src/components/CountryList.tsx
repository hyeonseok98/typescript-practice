import { useEffect, useState } from "react";
import { countryApi } from "../api/country.api";
import { Country } from "../types/country.type";
import CountryCard from "./CountryCard";

function CountryList() {
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getCountryData();
  }, []);

  const handleAddFavoriteCountry = (favoriteCountry: Country) => {
    setSelectedCountry((prevList) => [...prevList, favoriteCountry]);

    setCountryList(
      countryList.filter(
        (chosenCountry) => chosenCountry.id !== favoriteCountry.id
      )
    );
  };

  const handleRemoveFavoriteCountry = (favoriteCountry: Country) => {
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

  if (loading) {
    return <div className="text-xl font-semibold">로딩중입니다...</div>;
  }

  if (error) {
    return (
      <div className="text-xl font-semibold">에러가 발생했습니다: {error}</div>
    );
  }

  return (
    <main className="flex flex-col justify-start items-center h-screen ">
      <section className="w-5/6 mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mt-12 my-6">
          Favorite Countries
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {selectedCountry.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              onClick={() => handleRemoveFavoriteCountry(country)}
              isActive={true}
            />
          ))}
        </div>

        <h2 className="text-2xl font-bold text-center my-6">Countries</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countryList.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              onClick={() => handleAddFavoriteCountry(country)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default CountryList;
