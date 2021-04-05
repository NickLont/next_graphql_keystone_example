import useForm from '../lib/useForm'
import Form from './styles/formStyles'

const CreateProduct = () => {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        name: 'Nick',
        price: 1000,
        image: '',
        description: 'These are the best shoes',
    })

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault()
            }}
        >
            <fieldset>
                <label htmlFor="image">
                    Image:
                    <input
                        type="file"
                        id="image"
                        name="image"
                        required
                        defaultValue={inputs.image}
                        onChange={handleChange}
                    />
                </label>
                <label htmlFor="name">
                    Name:
                    <input
                        type="text"
                        id="name"
                        name="name"
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
        </Form>
    )
}

export default CreateProduct
