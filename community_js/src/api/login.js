import BASE_URL from "./baseUrl";

const login = async (body={}) => {
    const request = async (data) => {
        const url = BASE_URL + '/users/login';
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(data),
        });
        return res.json();
    };

    return request(body).then((data) => data);
};

export default login;