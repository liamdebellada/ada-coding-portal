export default function ProgressBar(props) {
    return (
        <div style={{transition: '1s ease all', width: '100%', height: '1rem', background: '#342E49', borderRadius: '1.6rem', overflow: 'hidden'}}>
            <div style={{background: '#564D76', width: `${props.value}%`, height: '100%'}}/>
        </div>
    )
}