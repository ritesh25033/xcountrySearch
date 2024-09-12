import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch countries data from API
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Filter countries based on search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='App'>
      {/* Search Bar */}
      <input
        type='text'
        placeholder='Search for a country...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='search-bar'
      />

      {/* Country Grid */}
      <div className='country-grid'>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div className='countryCard' key={index}>
              <img
                src={country.flags.png}
                alt={country.name.common + ' flag'}
              />
              <h2>{country.name.common}</h2>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
