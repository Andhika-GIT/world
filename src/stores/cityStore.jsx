import cities from '../../data/cities';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import axios from 'axios';

// const BASE_URL = 'http://localhost:9000';

const cityStore = create(
  persist(
    (set, get) => ({
      cities: [],
      currentCity: {},
      isLoading: false,
      setIsLoading: (condition) => {
        set({ isLoading: condition });
      },
      getCities: () => {
        set({ isLoading: true });
        set({ cities: cities });
        set({ isLoading: false });
      },
      getCurrentCity: (id) => {
        set({ isLoading: true });

        set((state) => ({
          currentCity: state.cities.find((city) => city.id === id),
        }));
        set({ isLoading: false });
      },
      createCity: (city) => {
        set({ isLoading: true });
        set((state) => ({
          cities: [...state.cities, city],
        }));
        set({ isLoading: false });
      },
      removeCity: (id) => {
        set({ isLoading: true });
        set((state) => ({
          cities: state.cities.filter((city) => city.id !== id),
        }));
        set({ isLoading: false });
      },
    }),
    {
      name: 'cities',
    }
  )
);

export default cityStore;
