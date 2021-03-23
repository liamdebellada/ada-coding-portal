import ChallengeView from '../components/challenge'

const data = {
    title: "Test",
    teacher: "Mark Campbell",
    due: "12/01/2023"
}

export default function submission() {
    return (
        <ChallengeView data={data}/>
    )
}