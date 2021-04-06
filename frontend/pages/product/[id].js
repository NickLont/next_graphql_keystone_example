import { useRouter } from 'next/router'
import SingleProduct from '../../components/SingleProduct'

const SingleProductPage = () => {
    const router = useRouter()
    const { id } = router.query

    return <SingleProduct id={id} />
}

export default SingleProductPage
