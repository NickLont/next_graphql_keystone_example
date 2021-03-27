const formatMoney = (amount) => {
    const options = {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,
    }

    // if the amount is perfectly divided by 100, skip ,00 in the end
    if (amount % 100 === 0) {
        options.minimumFractionDigits = 0
    }
    const formatter = Intl.NumberFormat('nl-NL', options)

    return formatter.format(amount / 100)
}

export default formatMoney
