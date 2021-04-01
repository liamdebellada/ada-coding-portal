import Head from 'next/head'
import React from 'react'

export default class layout extends React.Component {
    render() {
        const {children} = this.props
        return (
            <div className="overallParent">
                <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                    <title>{children[0].props.title}</title>
                </Head>
                <div>{children[0]}</div>
                <div style={{height: '100%'}}>{children[1]}</div>
            </div>
        )
    }
}

