export function delayedFetch(url, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        }, delay);
    });
}
