import axios from 'axios';

class ApiService {
  constructor() {
    // Update this to your backend URL
    // For development with Expo, use your computer's IP address
    this.baseURL = __DEV__ 
      ? 'http://192.168.5.40:3000/api/capture' // Demo mode - connects to local backend
      : 'https://your-production-url.com/api/capture';
    
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log demo mode status
    if (__DEV__) {
      console.log('🧪 DEMO MODE: Mobile app connecting to local backend at:', this.baseURL);
    }

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API] Response: ${response.status}`);
        return response;
      },
      (error) => {
        console.error('[API] Response error:', error.response?.data || error.message);
        return Promise.reject(this.handleApiError(error));
      }
    );
  }

  /**
   * Handle API errors and provide user-friendly messages
   */
  handleApiError(error) {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          return new Error(data?.error || 'Invalid request data');
        case 401:
          return new Error('Unauthorized access');
        case 404:
          return new Error(data?.error || 'Resource not found');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
          return new Error('Server error. Please try again later.');
        default:
          return new Error(data?.error || `Request failed with status ${status}`);
      }
    } else if (error.request) {
      // Network error
      return new Error('Network error. Please check your internet connection.');
    } else {
      // Other error
      return new Error(error.message || 'An unexpected error occurred');
    }
  }

  /**
   * Check API health and get demo information
   */
  async checkHealth() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Start new capture session with OTP
   */
  async startSession(otp) {
    try {
      const response = await this.client.post('/session/start', { otp });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Set capture mode for session
   */
  async setCaptureMode(sessionId, mode) {
    try {
      const response = await this.client.post(`/session/${sessionId}/mode`, { mode });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Upload captured image
   */
  async uploadImage(sessionId, captureType, imageUri) {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `${captureType}_capture.jpg`,
      });

      const response = await this.client.post(
        `/session/${sessionId}/capture/${captureType}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Complete capture session
   */
  async completeSession(sessionId) {
    try {
      const response = await this.client.post(`/session/${sessionId}/complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get session status
   */
  async getSessionStatus(sessionId) {
    try {
      const response = await this.client.get(`/session/${sessionId}/status`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get storage statistics
   */
  async getStorageStats() {
    try {
      const response = await this.client.get('/storage/stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
