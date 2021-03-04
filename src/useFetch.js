export default function useFetch(endpoint) {
    let cities = [];
    
    fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(data))
    
    return cities;
}