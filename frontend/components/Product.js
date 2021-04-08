import PropTypes from 'prop-types'
import Link from 'next/link'
import formatMoney from '../lib/formatMoney'
import ItemStyles from './styles/ItemStyles'
import PriceTagStyles from './styles/PriceTagStyles'
import TitleStyles from './styles/TitleStyles'
import DeleteProduct from './DeleteProduct'

const Products = ({ product }) => (
    <ItemStyles>
        <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
        <TitleStyles>
            <Link href={`/product/${product?.id}`}>{product?.name}</Link>
        </TitleStyles>
        <PriceTagStyles>{formatMoney(product.price)}</PriceTagStyles>
        <p>{product.description}</p>
        <div className="buttonList">
            <Link
                href={{
                    pathname: 'update',
                    query: {
                        id: product.id,
                    },
                }}
            >
                Edit
            </Link>
            <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </div>
    </ItemStyles>
)

Products.propTypes = {
    product: PropTypes.object,
}

export default Products
