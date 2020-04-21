const response = (response) => {
    if (!response.ok) {
        throw response.json();
    }
    return response.json();
};

export default response;