// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from './Form.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUrlPosition } from '../hooks/useUrlPosition';

import Spinner from './Spinner';
import Message from './Message';
import Button from './Button';
import BackButton from './BackButton';

// datepicker
import DatePicker from 'react-datepicker';

import cityStore from '../stores/cityStore';

import 'react-datepicker/dist/react-datepicker.css';

// convert country code to emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// to render emoji flag
const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join('');
  return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />;
};

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [countryEmoji, setCountryEmoji] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const { createCity } = cityStore();

  const [locationError, setLocationError] = useState('');

  const [mapLat, mapLng] = useUrlPosition();
  const navigate = useNavigate();

  // function to fetch city based on lat and lng in url
  const fetchCity = async () => {
    setIsLoadingLocation(true);
    setLocationError('');

    try {
      const { data } = await axios.get(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
      if (!data.countryCode) {
        throw new Error("That doesn't seem to be a city, clicked somewhere else");
      }
      setCityName(data.city || data.locality || '');
      setCountry(data.countryName);
      setCountryEmoji(convertToEmoji(data.countryCode));
    } catch (e) {
      if (e.response?.status === 400) {
        setLocationError('out of range, please refresh the page');
        return;
      }
      setLocationError(e.message);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  useEffect(() => {
    fetchCity();
  }, [mapLat, mapLng]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cityName || !startDate) return;

    const newCity = {
      cityName: cityName,
      country: country,
      emoji: countryEmoji,
      date: startDate,
      notes: notes,
      position: { lat: mapLat, lng: mapLng },
    };

    createCity(newCity);
  };

  if (!mapLat || !mapLng) return <Message message="Start by clicking somewhere on the map" />;

  if (isLoadingLocation) return <Spinner />;

  if (locationError) return <Message message={locationError} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{flagemojiToPNG(countryEmoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
