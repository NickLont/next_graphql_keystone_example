import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Product from './Product'
import { perPage } from '../config'

export const ALL_PRODUCTS_QUERY = gql`
    query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
        allProducts(skip: $skip, first: $first) {
            id
            name
            price
            description
            photo {
                id
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`

const ProductsListStyles = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
`

const Products = ({ currentPage }) => {
    const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
        variables: {
            skip: (currentPage - 1) * perPage,
            first: perPage,
        },
    })
    if (loading) return <p>loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div>
            <ProductsListStyles>
                {data.allProducts.map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </ProductsListStyles>
        </div>
    )
}

export default Products
