import { useRouter } from 'next/router'
import Products from '../../components/Products'
import Pagination from '../../components/Pagination'

const ProductsPage = () => {
    const router = useRouter()
    const page = Number(router.query.page)

    return (
        <div>
            <Pagination page={page || 1} />
            <Products currentPage={page || 1} />
            <Pagination page={page || 1} />
        </div>
    )
}

export default ProductsPage
