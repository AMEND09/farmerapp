import apiConfig from '../config/api.config';

class ApiService {
  private getStorageData<T>(key: string, defaultValue: T): T {
    if (!apiConfig.useLocalStorage) {
      throw new Error('Local storage is disabled in config');
    }
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  }

  private setStorageData<T>(key: string, data: T): void {
    if (!apiConfig.useLocalStorage) {
      throw new Error('Local storage is disabled in config');
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  private async fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (apiConfig.useLocalStorage) {
      throw new Error('API is disabled when using localStorage');
    }
    const response = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Farms
  async getFarms() {
    return apiConfig.useLocalStorage
      ? this.getStorageData('farms', [])
      : this.fetchApi(apiConfig.endpoints.farms);
  }

  async createFarm(farm: any) {
    if (apiConfig.useLocalStorage) {
      const farms = this.getStorageData('farms', []);
      const newFarm = { ...farm, id: farms.length + 1 };
      this.setStorageData('farms', [...farms, newFarm]);
      return newFarm;
    }
    return this.fetchApi(apiConfig.endpoints.farms, {
      method: 'POST',
      body: JSON.stringify(farm),
    });
  }

  // Tasks
  async getTasks() {
    return apiConfig.useLocalStorage
      ? this.getStorageData('tasks', [])
      : this.fetchApi(apiConfig.endpoints.tasks);
  }

  async createTask(task: any) {
    if (apiConfig.useLocalStorage) {
      const tasks = this.getStorageData('tasks', []);
      const newTask = { ...task, id: tasks.length + 1 };
      this.setStorageData('tasks', [...tasks, newTask]);
      return newTask;
    }
    return this.fetchApi(apiConfig.endpoints.tasks, {
      method: 'POST',
      body: JSON.stringify(task),
    });
  }

  // Issues
  async getIssues() {
    return apiConfig.useLocalStorage
      ? this.getStorageData('issues', [])
      : this.fetchApi(apiConfig.endpoints.issues);
  }

  // Crop Plan Events
  async getCropPlanEvents() {
    return apiConfig.useLocalStorage
      ? this.getStorageData('cropPlanEvents', [])
      : this.fetchApi(apiConfig.endpoints.cropPlanEvents);
  }

  // Plans
  async getPlans(planType: keyof typeof apiConfig.endpoints.plans) {
    const storageKey = `${planType}Plans`;
    return apiConfig.useLocalStorage
      ? this.getStorageData(storageKey, [])
      : this.fetchApi(apiConfig.endpoints.plans[planType]);
  }

  async createPlan(planType: keyof typeof apiConfig.endpoints.plans, plan: any) {
    const storageKey = `${planType}Plans`;
    if (apiConfig.useLocalStorage) {
      const plans = this.getStorageData(storageKey, []);
      const newPlan = { ...plan, id: Date.now(), status: 'planned' };
      this.setStorageData(storageKey, [...plans, newPlan]);
      return newPlan;
    }
    return this.fetchApi(apiConfig.endpoints.plans[planType], {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  // Trackers
  async getTrackerData(trackerType: keyof typeof apiConfig.endpoints.trackers) {
    const storageKey = `${trackerType}Records`;
    return apiConfig.useLocalStorage
      ? this.getStorageData(storageKey, [])
      : this.fetchApi(apiConfig.endpoints.trackers[trackerType]);
  }

  async createTrackerRecord(trackerType: keyof typeof apiConfig.endpoints.trackers, record: any) {
    const storageKey = `${trackerType}Records`;
    if (apiConfig.useLocalStorage) {
      const records = this.getStorageData(storageKey, []);
      const newRecord = { ...record, id: Date.now() };
      this.setStorageData(storageKey, [...records, newRecord]);
      return newRecord;
    }
    return this.fetchApi(apiConfig.endpoints.trackers[trackerType], {
      method: 'POST',
      body: JSON.stringify(record),
    });
  }
}

export const apiService = new ApiService();
export default apiService;