import currency from "currency.js";

const Rp = (amount = 0, symbol = 'Rp. ') => {
    return currency(amount, {
        symbol: symbol,
        separator: '.',
        precision: 0
    }).format()
}

export default Rp;