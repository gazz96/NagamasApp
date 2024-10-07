import Api from "../components/Api"

const WilayahAction = {
    getProvince: async (data = {}) => {
        const response = await Api.get(`/provinces`, {
            params: data
        });
        return response.data;
    },

    getVillage: async (data = {}) => {
        const response = await Api.get(`/villages`, {
            params: data
        });
        return response.data;
    },
    
}

export default WilayahAction