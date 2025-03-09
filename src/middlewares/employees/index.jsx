import ServiceAPI from "../../api/serviceAPI";

export async function getAllData() {
    try {
      const response = await ServiceAPI.get('/employees');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  };