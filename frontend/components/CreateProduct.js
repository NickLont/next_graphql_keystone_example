import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Router from 'next/router'
import useForm from '../lib/useForm'
import Form from './styles/formStyles'
import DisplayError from './DisplayError'
import { ALL_PRODUCTS_QUERY } from './Products'

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # Which variables are getting passed in and what types are they
        $name: String!
        $description: String!
        $price: Int!
        $image: Upload
    ) {
        createProduct(
            data: {
                name: $name
                description: $description
                price: $price
                status: "AVAILABLE"
                photo: { create: { image: $image, altText: $name } }
            }
        ) {
            id
            name
            description
            price
        }
    }
`

const CreateProduct = () => {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        name: 'Nick',
        price: 1000,
        image: '',
        description: 'These are the best shoes',
    })

    const [createProduct, { loading, error, data }] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    })

    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault()
                const res = await createProduct()
                clearForm()
                Router.push({
                    pathname: `/product/${res.data.createProduct.id}`,
                })
            }}
        >
            <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="image">
                    Image:
                    <input type="file" id="image" name="image" onChange={handleChange} />
                </label>
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="name"
                        value={inputs.name}
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
                        value={inputs.price}
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
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </label>
            </fieldset>
            <button type="submit">Add product</button>
            <DisplayError error={error} />
        </Form>
    )
}

export default CreateProduct
