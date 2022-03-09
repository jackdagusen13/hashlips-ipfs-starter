import fs from 'fs';
import path from 'path';

import { NFTStorage, File } from "nft.storage";
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const __dirname = path.resolve(path.dirname(''));
    const storage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY});

    const directory = [];

    for (const id of Array.from(Array(5).keys())) {
        const fileData = fs.readFileSync(path.join('images', `/${id + 1}.png`))
        const imageFile = new File([fileData], `FairDrop-${id}.png`, { type: 'image/png'});
        const image = await storage.storeBlob(imageFile);

        const metadata = {
        name: "test name",
        description: "test description",
        image: `ipfs://${image}`,
        properties: {
            Edition: id + 1,
            Of: 5,
            Artist: 'James Blagden'
        }
        }

        directory.push(
        new File([JSON.stringify(metadata, null, 2)], `${id}`)
        )
    }

    const pinnedDir = await storage.storeDirectory(directory);
    console.warn(pinnedDir)

}
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});