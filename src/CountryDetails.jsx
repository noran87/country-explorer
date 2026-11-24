
function CountryDetails({ country, onClose }) {
 return(
  <div>
   <h2>{country.name} — Details</h2>
    <p>Capital: {country.capital}</p>
    <p>Region: {country.region}</p>
    <p>Area: {country.area} km²</p>
    <button type="button" onClick={onClose}>
        Close
    </button>
  </div>
 );
}

export default CountryDetails;