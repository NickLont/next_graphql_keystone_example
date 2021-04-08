import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'

const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!) {
        deleteProduct(id: $id) {
            id
        }
    }
`
const update = (cache, payload) => {
    // remove payload from the cache without doing a trip to the backend
    cache.evict(payload)
}

const DeleteProduct = ({ id, children }) => {
    const [deleteProduct, { data, loading, error }] = useMutation(DELETE_PRODUCT_MUTATION, {
        variables: {
            id,
        },
        // callback for when the update succeeds
        // update,
    })
    return (
        <button
            type="button"
            disabled={loading}
            onClick={() => {
                if (confirm('Are you sure?')) {
                    try {
                        deleteProduct(id)
                    } catch (error) {
                        alert('Something went wrong with deleting')
                    }
                }
            }}
        >
            {children}
        </button>
    )
}

export default DeleteProduct
