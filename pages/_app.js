import '../styles/globals.css'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import App from 'next/app'
import { getSession } from 'next-auth/client'


export default class MyApp extends App {
  static async getInitialProps({ctx}) {
    var s = await getSession(ctx)
    if (ctx.pathname != "/" && !s) {
      ctx.res.writeHead(302, {location: '/'})
      ctx.res.end()
    }
    return {"test": "done"}
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Layout>
        <NavBar {...pageProps}/>
        <Component {...pageProps}/>
      </Layout>
    ) 
  }
}

