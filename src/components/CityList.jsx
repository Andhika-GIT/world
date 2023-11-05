import styles from './CityList.module.css';

import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';
import Button from './Button';

import cityStore from '../stores/cityStore';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CityList = () => {
  const { isLoading, cities, getCities } = cityStore();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />;
  return (
    <>
      <div className={styles.header}>
        <Button type="primary" disabled={cities.length === 15} onClick={() => navigate('/app/form')}>
          Add city
        </Button>
        <p>{cities.length} / 15</p>
      </div>

      <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />
        ))}
      </ul>
    </>
  );
};

export default CityList;
