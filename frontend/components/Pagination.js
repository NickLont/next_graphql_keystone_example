import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import Link from 'next/link'
import Head from 'next/head'
import PaginationStyles from './styles/PaginationStyles'
import DisplayError from './DisplayError'
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        _allProductsMeta {
            count
        }
    }
`

const Pagination = ({ page }) => {
    const { data, error, loading } = useQuery(PAGINATION_QUERY)

    if (loading) return <p>Loading...</p>
    if (error)
        return (
            <p>
                <DisplayError error={error} />
            </p>
        )

    const { count } = data._allProductsMeta
    const pageCount = Math.ceil(count / perPage)

    return (
        <PaginationStyles>
            <Head>
                <title>Sick Fits - Page 1 of __</title>
            </Head>
            <Link href={`/products/${page - 1}`}>
                <a aria-disabled={page <= 1}>⇽ Prev</a>
            </Link>
            <p>
                Page {page} of {pageCount}
            </p>
            <p>{count} items total</p>
            <Link href={`/products/${page + 1}`}>
                <a aria-disabled={page >= pageCount}>Next ➞</a>
            </Link>
        </PaginationStyles>
    )
}

export default Pagination
