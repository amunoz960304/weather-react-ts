import { useState, type FormEvent } from 'react';
import { countries } from '../../data/countries';
import styles from './Form.module.css';
import Alert from '../Alert/Alert';
import { Search } from '../../types';

type FormProps = {
  fetchWeather: (search: Search) => Promise<void>;
};

const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<Search>({
    city: '',
    country: '',
  });

  const [alert, setAlert] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios');
      return;
    }

    fetchWeather(search);

    setAlert('');
    setSearch({
      city: '',
      country: '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert message={alert} />}
      <div className={styles.field}>
        <label htmlFor='city'>Ciudad:</label>
        <input
          type='text'
          name='city'
          id='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={(e) => setSearch({ ...search, city: e.target.value })}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor='country'>Pais:</label>
        <select
          name='country'
          id='country'
          value={search.country}
          onChange={(e) => setSearch({ ...search, country: e.target.value })}
        >
          <option value=''>-- Selecciona una ciudad --</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type='submit' value='Consultar Clima' />
    </form>
  );
};

export default Form;
