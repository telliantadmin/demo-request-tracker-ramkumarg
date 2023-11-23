import http from './http'; // Assuming the file is named 'http.js' and located in the same directory
class UserService {
 
      getAllRequests = async () => {
        try {
          const response = await http.get('/api/user/');
          return response.data?.error ? [] : response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };


      updateRequest = async (req) => {
        try {
          const response = await http.post('/api/user/update', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };

      addRequest = async (req) => {
        try {
          const response = await http.post('/api/user/add', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
      getAgentList = async () => {
        try {
          const response = await http.get('/api/user/agentList');
          return response.data?.error ? [] : response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
    
}


export default new UserService();
