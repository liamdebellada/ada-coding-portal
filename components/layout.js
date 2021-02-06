import Head from 'next/head'
import React from 'react'

export default class layout extends React.Component {
    render() {
        const {children} = this.props
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
}

