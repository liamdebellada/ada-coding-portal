export default function submission() {
    return (
        <text>sumbission standalone</text>
    )
}


export async function getServerSideProps(context) {
    console.log(context.query)
    return {
        props: {}
    }
}
