import axios from 'axios'
export default function submission(props) {
    return (
        <div className="container">
            {props.submissions.map((submission, index) => (
                <div key={index}>
                   <text>{JSON.stringify(submission)}</text>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context) {
    var submissions = await axios.get(`${process.env.HOST}/api/getSubmissions/${context.query.id}`)
    if (submissions.code || !submissions.data) {
        context.res.writeHead(302, {location: '/'})
        context.res.end()
    }
    submissions = submissions.data.length > 0 ? submissions.data : []
    return {
        props: {
            submissions: submissions
        }
    }
}