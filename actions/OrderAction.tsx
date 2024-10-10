import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../components/Api"
import AuthAction from "./AuthAction";

const OrderAction = {
    list: async(data: object = {}) =>  {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await Api.get('/orders', {
            params: data,
            headers: {
                'x-token': userToken
            }
        })
        return response.data;
    },

    edit: async(id: string) => {
        const response = await Api.get(`/orders/${id}/edit`);
        return response.data;
    },

    save: async(data: object = {}) => {
        const response = await Api.post('/orders', data);
        return response.data;
    },

    cart: async(data: object = {}) => {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await Api.get('/cart/list', {
            params: data,
            headers: {
                'x-token': userToken
            }
        })
        return response.data;
    },
    addToCart: async(productId) => {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await Api.post('/cart/add', {
            product_id: productId,  
        }, 
        {
            headers: {
                'x-token': userToken
            } 
        });
        return response.data;
    },
    subtractFromCart: async(productId) => {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await Api.post('/cart/substract', {
            product_id: productId,  
        }, 
        {
            headers: {
                'x-token': userToken
            } 
        });
        return response.data;
    },
    checkout: async(data = {}) => {
        const userToken = await AuthAction.getUserToken();
        const response = await Api.post('/checkout', data, {
            headers: {
                'x-token': userToken
            } 
        });
        return response.data;
    },
    isCartExist: async(data = {}) => {
        const userToken = await AuthAction.getUserToken();
        const response = await Api.post('/cart/exists', data, {
            headers: {
                'x-token': userToken
            } 
        });
        return response.data;
    }
}

export default OrderAction;