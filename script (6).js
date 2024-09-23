function loadPage() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.startsWith('http') ? urlInput.value : 'http://' + urlInput.value;
    const cacheKey = `cache_${url}`;

    const cachedContent = localStorage.getItem(cacheKey);
    if (cachedContent) {
        document.getElementById('frame').srcdoc = cachedContent;
    } else {
        const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
        fetch(proxyUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('frame').srcdoc = data.contents;
                localStorage.setItem(cacheKey, data.contents);  // Cache the result
            })
            .catch(error => console.error('Error:', error));
    }
}
