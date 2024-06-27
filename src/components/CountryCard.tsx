import { Country } from "../types/country.type";

interface CountryProps {
  country: Country;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isActive?: boolean;
}

const CountryCard: React.FC<CountryProps> = ({
  country,
  onClick,
  isActive = false,
}) => {
  return (
    <div
      className={`w-full p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transfrom cursor-pointer ${
        isActive ? "border border-green-400" : "border-none"
      }`}
      onClick={onClick}
    >
      <img
        src={country.flags.png}
        className="w-20 h-auto mx-auto mb-4"
        alt={`${country.name.common} flag`}
      />
      <h2 className="text-xl font-semibold mb-4">{country.name.common}</h2>
      <p className="text-gray-600">{country.capital}</p>
    </div>
  );
};

export default CountryCard;
