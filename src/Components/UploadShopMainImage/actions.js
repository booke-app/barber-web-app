import {convertBase64} from "../../Utilities/utilities";
import {request} from "../../Utilities/Request";

export const uploadShopImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
        const base64 = await convertBase64(files[0]);
        return await uploadSingleImage(base64);

    }
};


const uploadSingleImage = async (base64) => {

    try {
        const res = await request('/upload-shop-image', {
            image: base64,
        }, null, 'POST')
        return res.secureUrlOfImage
    } catch (e) {
        throw new Error(e)
    }


}
