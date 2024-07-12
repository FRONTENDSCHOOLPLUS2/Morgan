import BASE_URL from "./baseUrl";

const newPost = async (token, body={}) => {
    const request = async (data) => {
        const url = BASE_URL + '/posts';
        const bearerToken = token;
        const authHeaders = { 'Authorization': `Bearer ${bearerToken}`};
        const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
            ...authHeaders,
        },
        body: JSON.stringify(data),
        });
    return res.json();
    };

    return request(body).then((data) => data);
};

const getPost = async () => {
    const request = async () => {
        const url = BASE_URL + '/posts';
        const res = await fetch(url, {
        method: "GET",
        headers: { 'Content-Type':'application/json'},
        }
        );
    return res.json();
    };

    return request().then((data) => data);
};

export {
    newPost,
    getPost,
}