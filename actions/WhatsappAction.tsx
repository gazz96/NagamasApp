import OpenWebUrl from "../components/OpenWebUrl";

const WhatsappAction = {
    template: (products = {}) => {
        let message = "";

        products.forEach((product, index) => {
            message += ``;
        });

        return message;
    },
    send: (phoneNumber: string, message: string) =>  {
        let url =  `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;  
        OpenWebUrl(url)
    }
}

export default WhatsappAction;