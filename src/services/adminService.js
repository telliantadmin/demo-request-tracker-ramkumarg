import http from './http'; // Assuming the file is named 'http.js' and located in the same directory
class AdminService {
    getUsers = async () => {
        try {
          const response = await http.get('/api/admin/');
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };

      deleteUser = async (req) => {
        try {
          const response = await http.post('/api/admin/delete', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };

      updateUser = async (req) => {
        try {
          const response = await http.post('/api/admin/update', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };

      addUser = async (req) => {
        try {
          const response = await http.post('/api/admin/add', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
}


export default new AdminService();
