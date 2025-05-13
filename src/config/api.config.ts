interface ApiConfig {
  baseUrl: string;
  useLocalStorage: boolean;  // Toggle between localStorage and API
  endpoints: {
    farms: string;
    tasks: string;
    issues: string;
    cropPlanEvents: string;
    plans: {
      planting: string;
      fertilizer: string;
      pest: string;
      irrigation: string;
      weatherTask: string;
      rotation: string;
      rainwater: string;
    };
    trackers: {
      fuel: string;
      soil: string;
      emissions: string;
      sequestration: string;
      energy: string;
    };
  };
}

const apiConfig: ApiConfig = {
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  useLocalStorage: true, // Set this to false when Django backend is ready
  endpoints: {
    farms: '/farms/',
    tasks: '/tasks/',
    issues: '/issues/',
    cropPlanEvents: '/crop-plan-events/',
    plans: {
      planting: '/plans/planting/',
      fertilizer: '/plans/fertilizer/',
      pest: '/plans/pest/',
      irrigation: '/plans/irrigation/',
      weatherTask: '/plans/weather-task/',
      rotation: '/plans/rotation/',
      rainwater: '/plans/rainwater/',
    },
    trackers: {
      fuel: '/trackers/fuel/',
      soil: '/trackers/soil/',
      emissions: '/trackers/emissions/',
      sequestration: '/trackers/sequestration/',
      energy: '/trackers/energy/',
    },
  },
};

export default apiConfig;