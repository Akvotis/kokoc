/**
 * Запрос на сервер.
 * @param {String} url 
 * @param {String} method 
 * @param {Object} headers
 */
export const ajax = (url, method, headers = {}) => {
    const responce = fetch(url, {
        method: method,
        headers: headers,
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error('Error occurred!');
        }
      
        return res.json();
    })
    .catch((err) => {
        console.log(err);
    })

    return responce;
} 