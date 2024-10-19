import Api from "../components/Api"
import AuthAction from "./AuthAction";

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
    },

    upload: async(data) => {
        const response = await Api.post('/products/upload', data, {
            headers: {
                'x-token': await AuthAction.getUserToken()
            }
        });
        return response.data;
    },

    categories: async(data = {}) => {
        const response = await Api.get('/categories', data);
        return response.data;
    }
}

export default ProductAction;