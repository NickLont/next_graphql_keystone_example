import { useState } from 'react'

const useForm = (initial = {}) => {
    // create a state object for our inputs
    const [inputs, setInputs] = useState(initial)

    const handleChange = (e) => {
        const { name, value, type } = e.target
        let parsedValue
        if (type === 'number') {
            parsedValue = parseInt(value)
        } else if (type === 'file') {
            parsedValue = e.target.files
        } else {
            parsedValue = value
        }

        setInputs({
            ...inputs,
            [name]: parsedValue,
        })
    }

    const resetForm = () => {
        setInputs(initial)
    }

    const clearForm = () => {
        const blankState = Object.entries(inputs).map((input) => {
            input[1] = ''
            return input
        })
        setInputs(Object.fromEntries(blankState))
    }

    return {
        inputs,
        handleChange,
        resetForm,
        clearForm,
    }
}

export default useForm
