import "./App.css";
import { useState } from "react";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favorites, setFavorites] = useState([]);

  async function handleSearch(event) {
  event.preventDefault();

  if (!search.trim()) return;
    
  setSelectedCountry(null);
  setCountries([]);
  setError("");
  setLoading(true);
  
  try {
    const response = await fetch(
      `https://countries.dev/name/${encodeURIComponent(search.trim())}`
    );

    if (!response.ok) {
      throw new Error("Could not find countries");
    }
  
    const data = await response.json();
    setCountries(data);

  } catch (error) {
  setError(error.message);
  setCountries([]);
  setSelectedCountry(null);
   
  } 
  finally {
    setLoading(false);

  }
  }

  function handleAddToFavorites(country) {
  if (!country) return;

  setFavorites((previousFavorites) =>
    previousFavorites.some((favorite) => favorite.name === country.name)
      ? previousFavorites
      : [...previousFavorites, country]
  );
  }

  function handleRemoveFromFavorites(country) {
  setFavorites((previousFavorites) =>
    previousFavorites.filter(
      (favorite) => favorite.name !== country.name
    )
  );
  

  }

  return (
    <main>
      <h1>Country Explorer</h1>
      <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a country name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      </form>

      {countries.map((country) => (
        <CountryCard
          key={country.name}
          country={country}
          onView={setSelectedCountry}
        />
      ))}
      
      {loading && <p>Loading countries...</p>}
      {error && <p role="alert">{error}</p>}
     
      {selectedCountry && (
        <CountryDetails
        country={selectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
       )}

      <button
        type="button"
        disabled={!selectedCountry}
        onClick={() => handleAddToFavorites(selectedCountry)}
      >
        Add Current Country to Favorites
      </button>
         
       {favorites.length > 0&& (
        <div>
          <h2>Favorites</h2>
          <ul>
            {favorites.map((country) => (
              <li key={country.name}>
            {country.name}
            <button
              type="button"
              onClick={() => handleRemoveFromFavorites(country)}
            >
              Remove
            </button>
          </li>
            ))}
          </ul>
          
        </div>
      )}
    </main>
  );
}

export default App;
