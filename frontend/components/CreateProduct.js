import useForm from '../lib/useForm'

const CreateProduct = () => {
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        name: 'Nick',
        price: 1000,
    })

    return (
        <form>
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
            <button type="button" onClick={clearForm}>
                Clear values
            </button>
            <button type="button" onClick={resetForm}>
                Reset values
            </button>
        </form>
    )
}

export default CreateProduct
