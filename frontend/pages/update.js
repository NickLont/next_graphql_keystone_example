import { useRouter } from 'next/router'
import UpdateProduct from '../components/UpdateProduct'

const UpdatePage = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <div>
            <UpdateProduct id={id} />
        </div>
    )
}

export default UpdatePage
