import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import DisplayError from './DisplayError'
import Form from './styles/formStyles'

const CREATE_USER_MUTATION = gql`
    mutation CREATE_USER($name: String!, $email: String!, $password: String!) {
        createUser(data: { name: $name, email: $email, password: $password }) {
            id
            name
            email
        }
    }
`

const SignUp = () => {
    const { inputs, handleChange, resetForm } = useForm({
        email: '',
        name: '',
        password: '',
    })
    const [signUp, { data, loading, error }] = useMutation(CREATE_USER_MUTATION)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const { name, password, email } = inputs
        try {
            await signUp({ variables: { email, password, name } })
        } catch (error) {}
        resetForm()
    }
    if (data?.createUser) {
        return <p>{`Created user with email: ${data?.createUser?.email}`} - Please go ahead and sign in!</p>
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign up for an account</h2>

            <DisplayError error={error} />
            <fieldset>
                <label htmlFor="name">
                    Name
                    <input
                        type="name"
                        name="name"
                        placeholder="Your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>{' '}
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

export default SignUp
