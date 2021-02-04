import Head from 'next/head'
import Link from "next/link"

function layout({children}) {
    
    return (
        <div>
            <Head>
                <title>{children[1].props.title}</title>
            </Head>
            <div>{children[0]}</div>
            <div>{children[1]}</div>
        </div>
    )
}

export default layout