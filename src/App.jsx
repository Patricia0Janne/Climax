import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { Suspense, useEffect, useState } from "react";
import { http } from "./logica/api";
import ForecastCard from "./components/ForecastCard";
import { Loading } from "./components/Loading";

const API_KEY = import.meta.env.VITE_API_KEY;
const URL = http;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cidade, setCidade] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather({ lat, lon, city }) {
      setLoading(true);
      try {
        let url = "";

        if (lat && lon) {
          url = `${URL}?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`;
        } else if (city) {
          url = `${URL}?format=json-cors&key=${API_KEY}&city_name=${city}`;
        }
        const response = await fetch(url);
        const data = await response.json();

        if (data.results) {
          setWeather(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        }
      } catch (erro) {
        console.error("Erro", erro);
      } finally {
        setLoading(false);
      }
    }

    if (cidade) {
      fetchWeather({ city: cidade });
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather({ lat: latitude, lon: longitude });
        },
        (err) => {
          setError("Permissão de localização negada." + err.message);
          setLoading(false);
        },
      );
    } else {
      setError("Geolocalização não suportada pelo navegador.");
      setLoading(false);
    }
  }, [cidade]);

  return (
    <div className="app-container">
      <SearchBar onSearch={setCidade} />
      {loading ? (
        <Loading />
      ) : (
        weather && (
          <>
            <h1>{weather.city}</h1>
            <WeatherCard weather={weather} />
            {forecast.map((forecast, index) => (
              <ForecastCard {...forecast} key={index} />
            ))}
          </>
        )
      )}
    </div>
  );
}

export default App;
