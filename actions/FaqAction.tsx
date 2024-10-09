import Api from "../components/Api"

const FaqAction = {
    list: async(data: object = {}) =>  {
        const response = await Api.get('/faq', {
            params: data
        })

        return response.data;
    },

    edit: async(id: string) => {
        const response = await Api.get(`/faq/${id}/edit`);
        return response.data;
    },

    save: async(data: object = {}) => {
        const response = await Api.post('/faq', data);
        return response.data;
    }
}

export default FaqAction;