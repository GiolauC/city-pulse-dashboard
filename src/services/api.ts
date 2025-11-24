const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

interface LoginRequest {
  userName: string;
  password: string;
}

interface RegisterRequest {
  userName: string;
  password: string;
  localizacao: 'CIDADE' | 'BAIRRO';
  estado?: string;
  cidade?: string;
  bairro?: string;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('auth_token');

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      return await response.text() as T;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Photo Reports
  async uploadPhotoReport(formData: FormData) {
    const token = localStorage.getItem('auth_token');
    const response = await fetch(`${this.baseURL}/photo-report/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });
    return response.json();
  }

  async getPhotoReports() {
    return this.request<any[]>('/photo-report');
  }

  async getPhotoReportsByLocation(location: string) {
    return this.request<any[]>(`/photo-report/location/${encodeURIComponent(location)}`);
  }

  // User Interactions (Demandas)
  async createUserInteraction(interaction: any) {
    return this.request<any>('/user-interaction', {
      method: 'POST',
      body: JSON.stringify(interaction),
    });
  }

  async getUserInteractions() {
    return this.request<any[]>('/user-interaction');
  }

  async getUserInteraction(id: string) {
    return this.request<any>(`/user-interaction/${id}`);
  }

  // Opinions (Avaliações)
  async createOpinion(opinion: any) {
    return this.request<any>('/opinion', {
      method: 'POST',
      body: JSON.stringify(opinion),
    });
  }

  async getOpinions() {
    return this.request<any[]>('/opinion');
  }

  async getUserOpinions(userId: string) {
    return this.request<any[]>(`/opinion/user/${userId}`);
  }

  // Context (Dashboard data)
  async getContext(search?: string) {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.request<any[]>(`/context${params}`);
  }

  async getContextById(id: string) {
    return this.request<any>(`/context/${id}`);
  }

  // Users
  async getUsers() {
    return this.request<any[]>('/users');
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  // Metrics
  async getDashboardMetrics() {
    return this.request<any>('/metrics/dashboard');
  }

  async getInteractionMetrics() {
    return this.request<any>('/metrics/interactions');
  }

  async getOpinionMetrics() {
    return this.request<any>('/metrics/opinions');
  }

  // Advanced Metrics
  async getCityMetrics(cityName?: string) {
    const params = cityName ? `?city=${encodeURIComponent(cityName)}` : '';
    return this.request<any>(`/metrics/city${params}`);
  }

  async getNeighborhoodMetrics(neighborhood?: string) {
    const params = neighborhood ? `?neighborhood=${encodeURIComponent(neighborhood)}` : '';
    return this.request<any>(`/metrics/neighborhood${params}`);
  }

  async getDemographicMetrics() {
    return this.request<any>('/metrics/demographics');
  }

  async getBusinessMetrics() {
    return this.request<any>('/metrics/business');
  }

  async getUrgentIssues() {
    return this.request<any>('/metrics/urgent-issues');
  }

  async getCategoriesMetrics() {
    return this.request<any>('/metrics/categories');
  }

  async getTimeSeriesMetrics(period: 'daily' | 'weekly' | 'monthly' = 'monthly') {
    return this.request<any>(`/metrics/timeseries?period=${period}`);
  }

  // Health check
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/actuator/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // Auth methods
  async signIn(email: string, password: string) {
    try {
      const loginData: LoginRequest = {
        userName: email,
        password: password
      };
      
      const response = await this.request<string>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });
      
      const token = 'jwt_token_' + Date.now();
      const user = { 
        id: '1', 
        email, 
        role: 'city', 
        city_name: 'São Paulo' 
      };
      
      return { user, token };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string, role: string, cityName?: string, neighborhoodName?: string) {
    try {
      const formData = new FormData();
      formData.append('userName', email);
      formData.append('password', password);
      formData.append('localizacao', role === 'city' ? 'CIDADE' : 'BAIRRO');
      
      if (cityName) formData.append('cidade', cityName);
      if (neighborhoodName) formData.append('bairro', neighborhoodName);
      if (role === 'city') formData.append('estado', 'SP');

      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.status}`);
      }

      const token = 'jwt_token_' + Date.now();
      const user = { 
        id: '1', 
        email, 
        role, 
        city_name: cityName, 
        neighborhood_name: neighborhoodName 
      };
      
      return { user, token };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();