import { useRouter } from 'next/router'

export default function Challenge() {
    const router = useRouter()
    const { id } = router.query

    return <h1>The current challenge is {id} </h1>

} 