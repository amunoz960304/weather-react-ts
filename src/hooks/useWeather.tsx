import axios from 'axios';
import { z } from 'zod';
import { Search } from '../types';
import { useMemo, useState } from 'react';

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number(),
  }),
});

export type Weather = z.infer<typeof Weather>;

const useWeather = () => {
  const [weather, setWeather] = useState<Weather>({
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchWeather = async ({ city, country }: Search): Promise<void> => {
    setIsLoading(true);
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const geoUrl = import.meta.env.VITE_WEATHER_URL;

      const { data } = await axios(
        `${geoUrl}/geo/1.0/direct?q=${city},${country}&appid=${apiKey}`
      );

      if (!data[0]) {
        setNotFound(true);
        return;
      }

      const [{ lat, lon }] = data;

      const { data: weatherData } = await axios(
        `${geoUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );

      const result = Weather.safeParse(weatherData);

      if (result.success) {
        setWeather({
          name: result.data.name,
          main: {
            temp_max: +(result.data.main.temp_max - 273).toFixed(1),
            temp_min: +(result.data.main.temp_min - 273).toFixed(1),
            temp: +(result.data.main.temp - 273).toFixed(1),
          },
        });
      }
    } catch (error) {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  return {
    fetchWeather,
    weather,
    hasWeatherData,
    isLoading,
    notFound,
  };
};

export default useWeather;
