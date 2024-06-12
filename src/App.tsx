import styles from './App.module.css';
import Alert from './components/Alert/Alert';
import Form from './components/Form/Form';
import Loader from './components/Loader/Loader';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import useWeather from './hooks/useWeather';

function App() {
  const { fetchWeather, weather, hasWeatherData, isLoading, notFound } =
    useWeather();
  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />
        {isLoading && <Loader />}
        {!isLoading && hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert message='No se encontraron datos' />}
      </div>
    </>
  );
}

export default App;
