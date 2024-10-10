import Api from "../components/Api"

const SettingAction = {
    list: async(data: object = {}) =>  {
        const response = await Api.get('/options', {
            params: data
        })
        return response.data;
    }
}

export default SettingAction;