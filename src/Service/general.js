export const getAppName = () => {
    return fetch('/manifest.json')
    .then(response => {
        return response.json();
    });
}