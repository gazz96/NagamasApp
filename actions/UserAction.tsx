import Api from "../components/Api";
import AuthAction from "./AuthAction";

const UserAction = {

    getHistoryOrder: async (data = {}) => {
        const response = await Api.get('/orders', {
            params: data,
            headers: {
                'x-token': await AuthAction.getUserToken()
            }
        })
        return response.data;
    },

    updateBuktiBayar: async(data = {}) => {
        const response = await Api.post('/orders/update-bukti-bayar', data, {
            headers: {
                'x-token': await AuthAction.getUserToken()
            }
        })
        return response.data;
    }

}

export default UserAction;