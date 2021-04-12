import { useRouter } from 'next/dist/client/router'
import RequestReset from '../components/RequestReset'
import Reset from '../components/Reset'

const ResetPage = () => {
    const { query } = useRouter()

    if (!query?.token) {
        return (
            <div>
                <p>Sorry you must supply a token</p>
                <RequestReset />
            </div>
        )
    }

    return (
        <div>
            <p>Reset your password {query.token}</p>
            <Reset />
        </div>
    )
}

export default ResetPage

// export default function ResetPage(props) {
//     console.log('props: ', props)

//     return (
//         <div>
//             <p>Reset your password</p>
//         </div>
//     )
// }
