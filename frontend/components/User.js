import { useQuery, gql } from '@apollo/client'

const CURRENT_USER_QUERY = gql`
    query {
        authenticatedItem {
            ... on User {
                id
                email
                name
            }
        }
    }
`

const useUser = () => {
    const { data } = useQuery(CURRENT_USER_QUERY)
    return data?.authenticatedItem
}

export { useUser, CURRENT_USER_QUERY }
