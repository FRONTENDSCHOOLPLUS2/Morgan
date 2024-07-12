import BASE_URL from "./baseUrl";

const upload = async (body={}) => {
    const request = async (data) => {
        const url = BASE_URL + '/files';
        const res = await fetch(url, {
            method: "POST",
            // body: JSON.stringify(data),
            body: data,
        });
        return res.json();
    };

    return request(body).then((data) => data);
};

export default upload;