const fetchCollections = async () => {
    try {
        const response = await fetch("https://api.opensea.io/api/v1/collections?offset=0&limit=20", {
            headers: {
                "X-API-KEY": "f2e92a5301c34ea590a8f3838dcb973c"
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data.collections;
            return data.collections.filter(collection => collection.image_url && collection.primary_asset_contracts.length != 0);
        } else {
            console.error("Failed to fetch collections.");
            return null;
        }
    } catch (error) {
        console.error("Error occurred while fetching collections:", error);
        return null;
    }
};

// Call the fetchCollections function to get the collections
fetchCollections().then(collections => {
    if (collections) {
        collections.forEach(collection => {
            console.log(collection.slug);
        });
    }
});
