import Head from 'next/head'
import React from 'react'

export default class layout extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div className="maxH">
                <Head>
                    <title>{children[0].props.title}</title>
                </Head>
                <div>{children[0]}</div>
                <div className="maxH">{children[1]}</div>
            </div>
        )
    }
}

