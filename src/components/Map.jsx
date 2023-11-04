import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";

const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        position {lat} {lng}
      </h1>
      <button
        onClick={() =>
          setSearchParams({
            lat: 23,
            lng: 25,
          })
        }
      >
        Change position
      </button>
    </div>
  );
};

export default Map;
