export default function error({ baseUrl, basePath, error = 'default', res }) {
    return (
        <div>{error}</div>
    )
}