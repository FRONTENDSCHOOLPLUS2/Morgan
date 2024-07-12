import BASE_URL from "./baseUrl";

const getReply = async (postId) => {
    const request = async () => {
        const url = BASE_URL + '/posts/ ' + postId + '/replies'
        const res = await fetch(url, {
        method: "GET",
        headers: { 'Content-Type':'application/json'},
        }
        );
    return res.json();
    };

    return request().then((data) => data);
};

const newReply = async (token, post_id, body={}) => {
    const request = async (data) => {
        const url = BASE_URL + '/posts/' + post_id + '/replies';
        const bearerToken = token;
        const authHeaders = { 'Authorization' : `Bearer ${bearerToken}` };
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                ...authHeaders
            },
        body: JSON.stringify(data),
        });
    return res.json();
    };

    return request(body).then((data) => data);
};

export {
    getReply,
    newReply,
}