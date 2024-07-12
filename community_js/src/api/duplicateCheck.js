import BASE_URL from "./baseUrl";

const duplicateCheck = async (email) => {
    const request = async () => {
        const url = BASE_URL + '/users/email?email=' + email;
        const res = await fetch(url, {
            method: "GET",
            headers: {"Content-Type":"application/json"},
        });
        return res.json();
    };

    return request().then((data) => data);
};

export default duplicateCheck;