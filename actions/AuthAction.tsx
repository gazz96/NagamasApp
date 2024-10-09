import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../components/Api";
import axios from "axios";

const AuthAction = {
    registerUser: async(data = {}) => {
        const response = await Api.post('/signup', data);
        return response.data;
    },
    login: async(data = {}) => {
        const response = await Api.post('/signin', data);
        return response.data;
    },
    me: async() => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await Api.post('/me', {}, {
            headers: {
                'x-token': token
            }
        });
        return response.data;
    },

    updateProfile: async(data: object = {}) => {
        const token = await AsyncStorage.getItem('userToken');
        const response = await Api.post('/me/update', data, {
            headers: {
                'x-token': token
            }
        });
        return response.data;
    },

    getUserToken: async() => {
        try {
            return await AsyncStorage.getItem('userToken');
        }
        catch(error) {
            return '';
        }
    },

    isUserLoggedIn: async() => {
        const token = await AuthAction.getUserToken();
        if(token) {
            return true;
        }
        return false;
    }
}

export default AuthAction;