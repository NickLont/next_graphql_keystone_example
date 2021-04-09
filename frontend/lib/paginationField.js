import { PAGINATION_QUERY } from '../components/Pagination'

const paginationField = () => {
    return {
        keyArgs: false, // tells apollo we will take care of everything
        read(existing = [], { args, cache }) {
            const { skip, first } = args
            // Read the number of items on the page from the cache
            const data = cache.readQuery({ query: PAGINATION_QUERY })
            const count = data?._allProductsMeta?.count
            const page = skip / first + 1
            const pages = Math.ceil(count / first)
            // Check if we have existing items
            const items = existing.slice(skip, skip + first).filter((x) => x)
            // If there are items
            // AND there aren't enough items to satisfy how many were requested
            // And we are on the last page
            // Then just send it
            if (items.length && items.length !== first && page === pages) {
                return items
            }

            if (items.length !== first) {
                // This means we don't have any items, we must go and fetch them from the network
                return false
            }
            // If there are items, just return them from the cache and we don't need to go to the network
            if (items.length) {
                console.log(`There are ${items.length} items in the cache! Going to send them to apollo`)
                return items
            }

            return false // Fallback to network

            // first thing apollo does is asking the read function for these items
            // We can do 2 things:
            // 1. Return the items because they are already in the cache
            // 2. Return false from here (it will make a network request)
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args
            // This runs when the Apollo client comes back from the network with our product
            // console.log(`MErging items from the network ${incoming.length}`);
            const merged = existing ? existing.slice(0) : []
            for (let i = skip; i < skip + incoming.length; ++i) {
                merged[i] = incoming[i - skip]
            }
            // console.log(merged);
            // Finally we return the merged items from the cache,
            return merged
        },
    }
}

export default paginationField
