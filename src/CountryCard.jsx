
function CountryCard({ country, onView }) {
  return (
    <div>
      <h2>{country.name}</h2>

      <img
        src={country.flags.png}
        alt={`Flag of ${country.name}`}
        width="160"
      />

      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>

      <button type="button" onClick={() => onView(country)}>
        View Details
      </button>
    </div>
  );
}

export default CountryCard;