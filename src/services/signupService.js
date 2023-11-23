import http from './http'; // Assuming the file is named 'http.js' and located in the same directory
class SignupService {
    signup = async (req) => {
        try {
          const response = await http.post('/api/auth/signup', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
}


export default new SignupService();
