function loadPage(url) {
    const frame = document.getElementById('frame');

    frame.style.display = 'none'; // Hide the iframe initially
    frame.src = ""; // Clear the iframe's src to avoid previous content

    // Load the content in the iframe via the proxy
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Inject the fetched page content into the iframe
            frame.srcdoc = data.contents;
            frame.style.display = 'block'; // Show the iframe once content is loaded

            // Delay to ensure the iframe is fully loaded before accessing its content
            setTimeout(() => {
                const frameDoc = frame.contentDocument || frame.contentWindow.document;

                // Intercept all link clicks within the iframe
                frameDoc.querySelectorAll('a').forEach(anchor => {
                    anchor.addEventListener('click', function(event) {
                        event.preventDefault(); // Prevent the default link click action
                        const newUrl = anchor.href;

                        // Load the clicked link through the proxy again
                        const proxiedUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(newUrl);
                        loadPage(proxiedUrl); // Recursively load the new page inside the proxy
                    });
                });
            }, 500); // Adjust this delay based on how long the content takes to load
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
