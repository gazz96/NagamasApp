import Api from "../components/Api"

const ProductAction = {
    list: async(data: object = {}) =>  {
        const response = await Api.get('/products', {
            params: data
        })

        return response.data;
    },

    edit: async(id: string) => {
        const response = await Api.get(`/products/${id}/edit`);
        return response.data;
    },

    save: async(data: object = {}) => {
        const response = await Api.post('/products', data);
        return response.data;
    }
}

export default ProductAction;