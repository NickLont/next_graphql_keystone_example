import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './DisplayError'
import Form from './styles/formStyles'
import { CURRENT_USER_QUERY } from './User'

const SIGNIN_MUTATION = gql`
    mutation SIGNIN_MUTATION($email: String!, $password: String!) {
        authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
                sessionToken
                item {
                    id
                    name
                    email
                }
            }
            ... on UserAuthenticationWithPasswordFailure {
                code
                message
            }
        }
    }
`

const SignIn = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    })
    const [signIn, { data }] = useMutation(SIGNIN_MUTATION, {
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { password, email } = inputs
        // send email and password to the graphQl api
        await signIn({ variables: { email, password } })
        resetForm()
    }

    const error =
        data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure'
            ? data?.authenticateUserWithPassword
            : null

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign into your account</h2>

            <DisplayError error={error} />
            <fieldset>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="password"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Sign In</button>
            </fieldset>
        </Form>
    )
}

export default SignIn
