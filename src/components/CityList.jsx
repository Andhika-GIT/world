import styles from './CityList.module.css';

import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

import cityStore from '../stores/cityStore';
import { useEffect } from 'react';

const CityList = () => {
  const { isLoading, cities, getCities } = cityStore();

  useEffect(() => {
    if (cities.length > 0) return;
    getCities();
  }, []);

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
