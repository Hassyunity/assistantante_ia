const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const CITY = "Antananarivo";
const COUNTRY = "MG";

export async function getWeatherReport(): Promise<string> {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&appid=${API_KEY}&units=metric&lang=fr`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données météo");
    }

    const data = await response.json();
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    return `À ${CITY}, il fait ${temperature}°C avec ${description}. Humidité : ${humidity}%, vent : ${windSpeed} m/s.`;
  } catch (error) {
    console.error("Erreur météo :", error);
    return "Impossible de récupérer les données météo actuellement.";
  }
}
