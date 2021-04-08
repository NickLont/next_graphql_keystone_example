import { useMutation, useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './DisplayError'
import Form from './styles/formStyles'

const SINGLE_PRODUCT_QUERY = gql`
    query SINGLE_PRODUCT_QUERY($id: ID!) {
        Product(where: { id: $id }) {
            id
            name
            description
            price
            photo {
                id
                altText
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`

const UPDATE_PRODUCT_MUTATION = gql`
    mutation UPDATE_PRODUCT_MUTATION($id: ID!, $data: ProductUpdateInput!) {
        updateProduct(id: $id, data: $data) {
            id
            name
        }
    }
`

const UpdateProduct = ({ id }) => {
    const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id },
    })

    // 1. get existing product
    // 2. get the mutation to update the Product
    const [updateProduct, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(
        UPDATE_PRODUCT_MUTATION
    )
    // 3. Need form to handle the updates+
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        name: data?.Product?.name,
        price: data?.Product?.price,
        description: data?.Product?.description,
    })

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <Form
                onSubmit={async (e) => {
                    e.preventDefault()
                    // implement onSubmit
                    await updateProduct({ variables: { id, data: inputs } })
                }}
            >
                <fieldset disabled={updateLoading} aria-busy={updateLoading}>
                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="name"
                            value={inputs.name || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="price">
                        Price:
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="price"
                            value={inputs.price || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <label htmlFor="description">
                        Description:
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="description"
                            value={inputs.description || ''}
                            onChange={handleChange}
                        />
                    </label>
                </fieldset>
                <button type="submit">Update product</button>
                <DisplayError error={error} />
            </Form>
        </div>
    )
}
export default UpdateProduct
