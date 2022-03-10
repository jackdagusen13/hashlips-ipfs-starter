import { NFTStorage, File } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'
import dotenv from 'dotenv'

dotenv.config()
const token = process.env.NFT_STORAGE_KEY

async function main() {
    const path = process.argv.slice(2)
    const files = await getFilesFromPath(`build/${path}`)
    const storage = new NFTStorage({ token })
    console.log(`storing ${files.length} file(s) from ${path}`)
    const cid = await storage.storeDirectory(files, {
        pathPrefix: path, 
        hidden: true 
})
const status = await storage.status(cid)
console.log(status)
}
main()