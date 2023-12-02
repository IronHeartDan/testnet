import axios from "axios";

const URL = "https://api.opensea.io/v2/orders/bsc/seaport/listings";

(async () => {
    const collections = []

    const res = await axios.get(URL, {
        headers: {
            "X-API-KEY": "f2e92a5301c34ea590a8f3838dcb973c"
        }
    })

    const orders = res.data.orders || []

    for (let i = 0; i < orders.length; i++) {
        const assets = orders[i].maker_asset_bundle.assets;

        for (let j = 0; j < assets.length; j++) {
            const collection = assets[j].collection;
            const exists = collections.some(item => item.slug === collection.slug);

            if (!exists) {
                collections.push(collection)
            }
        }

    }

    console.log(collections.length);


    // // Filter out NFTs
    // const FilteredNfts = orders.map(order => {
    //     return order.maker_asset_bundle.assets

    // });

    // const nfts = FilteredNfts.flat()

    // console.log(nfts);

    // // nfts.forEach(nft => {
    // //     console.log(nft);
    // // });

})()