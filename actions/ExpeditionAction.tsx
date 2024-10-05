import api from "./Api";
const ExpeditionAction = {
    list: () => {

    },
    save: async function(data: object) {
        const response = await api.post('/expeditions', data);
        return response.data;
    }
}

export default ExpeditionAction;