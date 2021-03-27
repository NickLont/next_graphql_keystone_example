import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import ItemStyles from './styles/ItemStyles'
import PriceTagStyles from './styles/PriceTagStyles'
import TitleStyles from './styles/TitleStyles'

const Products = ({ product }) => {
    console.log('product: ', product)
    return (
        <ItemStyles>
            <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
            <TitleStyles>
                <Link href={`/product/${product?.id}`}>{product?.name}</Link>
            </TitleStyles>
            <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
            <p>{product.description}</p>
        </ItemStyles>
    )
}

export default Products
