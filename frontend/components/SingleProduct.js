import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Head from 'next/head'
import styled from 'styled-components'
import DisplayError from './DisplayError'

const ProductStyles = styled.div`
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 800px;
    min-width: var(--maxWidth);
    justify-content: center;
    align-items: top;
    img {
        width: 100%;
        /* height: 100%; */
        object-fit: center;
    }
`

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

const SingleProduct = ({ id }) => {
    const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
        variables: { id },
    })

    if (loading) return <p>Loading...</p>
    if (error) return <DisplayError error={error} />

    const { Product } = data

    return (
        <ProductStyles>
            <Head>
                <title>Sick fits | {Product.name}</title>
            </Head>
            <img src={Product.photo.image.publicUrlTransformed} alt={Product.photo.altText} />
            <div className="details">
                <h2>{Product.name}</h2>
                <p>{Product.description}</p>
            </div>
        </ProductStyles>
    )
}

SingleProduct.propTypes = {
    id: PropTypes.string,
}

export default SingleProduct
