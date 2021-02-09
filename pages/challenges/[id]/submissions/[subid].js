import axios from 'axios'
export default function submission(props) {
    return (
        <text>{JSON.stringify(props.submission)}</text>
    )
}

export async function getServerSideProps(context) {
    let submission = await axios.get(`http://fbbsvr.ddns.net:5192/api/getSubmission/${context.query.subid}`)
    if (submission.code || submission.data.length == 0 || !submission.data) {
        context.res.writeHead(302, {location: '/'})
        context.res.end()
    }
    return {
        props: {
            submission: submission.data
        }
    }
}
