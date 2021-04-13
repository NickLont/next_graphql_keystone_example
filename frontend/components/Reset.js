import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/dist/client/router'
import useForm from '../lib/useForm'
import DisplayError from './DisplayError'
import Form from './styles/formStyles'

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $token: String!, $password: String!) {
        redeemUserPasswordResetToken(email: $email, token: $token, password: $password) {
            code
            message
        }
    }
`

const Reset = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        password: '',
    })
    const [reset, { data, loading, error }] = useMutation(RESET_MUTATION)
    const { query } = useRouter()
    const { token } = query

    const successError =
        data?.redeemUserPasswordResetToken?.code === 'FAILURE' ? data?.redeemUserPasswordResetToken : null

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email, password } = inputs
        try {
            await reset({ variables: { email, password, token } })
        } catch (error) {}
        resetForm()
    }
    if (data?.createUser) {
        return <p>{`Created user with email: ${data?.createUser?.email}`} - Please go ahead and sign in!</p>
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a password reset</h2>
            {data && !data.code && <p>Success, you can now log in!</p>}
            <DisplayError error={error || successError} />
            <fieldset>
                {data?.sendUserPasswordResetLink === null && <p>Success!</p>}
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
                <button type="submit">Request reset</button>
            </fieldset>
        </Form>
    )
}

export default Reset
