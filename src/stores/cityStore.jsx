import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

const cityStore = create(
  persist(
    (set, get) => ({
      cities: [],
      isLoading: false,
      setIsLoading: (condition) => {
        set({ isLoading: condition });
      },
      getCities: async () => {
        set({ isLoading: true });
        try {
          const res = await axios.get(`${BASE_URL}/cities`);

          set({ cities: res.data });
        } catch (e) {
          alert("there's something wrong when fetching cities");
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'cities',
    }
  )
);

export default cityStore;
