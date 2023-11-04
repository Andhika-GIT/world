import styles from './Map.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import cityStore from '../stores/cityStore';

import { useState, useEffect } from 'react';

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const navigate = useNavigate();
  const { cities } = cityStore();

  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join('');
    return <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />;
  };

  // create our own custom center, to make the map reactive when location is changed
  const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
  };

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
