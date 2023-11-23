import http from './http'; // Assuming the file is named 'http.js' and located in the same directory
class AgentService {
    getRequests = async () => {
        try {
          const response = await http.get('/api/agent/assignedToMe');
          return response.data?.error ? [] : response.data; ; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
      getAllRequests = async () => {
        try {
          const response = await http.get('/api/agent/');
          return response.data?.error ? [] : response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };


      updateRequest = async (req) => {
        try {
          const response = await http.post('/api/agent/update', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };

      addRequest = async (req) => {
        try {
          const response = await http.post('/api/agent/add', req);
          return response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
      getAgentList = async () => {
        try {
          const response = await http.get('/api/agent/agentList');
          return response.data?.error ? [] : response.data; // Assuming response contains user data or token
        } catch (error) {
          throw error; // Handle errors appropriately in your component
        }
      };
}


export default new AgentService();
