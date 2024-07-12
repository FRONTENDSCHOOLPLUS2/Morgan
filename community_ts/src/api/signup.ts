import BASE_URL from "./baseUrl";
import { IProfileImage } from "#types/community";

const signup = async (body: {[k: string]: FormDataEntryValue | IProfileImage}) => {
    const request = async (data: {[k: string]: FormDataEntryValue | IProfileImage}) => {
        const url = BASE_URL + '/users';
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data),
        });
        return res.json();
    };

    return request(body).then((data) => data);
};

export default signup;