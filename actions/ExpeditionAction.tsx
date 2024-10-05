import Api from "../components/Api"

const ExpeditionAction = {
    list: async(data: object = {}) =>  {
        const response = await Api.get('/expeditions', {
            params: data
        })

        return response.data;
    },

    edit: async(id: string) => {
        const response = await Api.get(`/expeditions/${id}/edit`);
        return response.data;
    },

    save: async(data: object = {}) => {
        const response = await Api.post('/expeditions', data);
        return response.data;
    }
}

export default ExpeditionAction;