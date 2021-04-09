import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './DisplayError'
import Form from './styles/formStyles'

const REQUEST_RESET_MUTATION = gql`
    mutation SEND_PASSWORD_RESET_LINK($email: String!) {
        sendUserPasswordResetLink(email: $email) {
            code
            message
        }
    }
`

const RequestReset = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
    })
    const [resetPassword, { data, loading, error }] = useMutation(REQUEST_RESET_MUTATION)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { email } = inputs
        try {
            await resetPassword({ variables: { email } })
        } catch (error) {}
        resetForm()
    }
    if (data?.createUser) {
        return <p>{`Created user with email: ${data?.createUser?.email}`} - Please go ahead and sign in!</p>
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Request a password reset</h2>

            <DisplayError error={error} />
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

                <button type="submit">Request reset</button>
            </fieldset>
        </Form>
    )
}

export default RequestReset
