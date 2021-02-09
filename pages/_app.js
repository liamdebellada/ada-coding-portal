import '../styles/globals.css'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import App from 'next/app'
import { getSession } from 'next-auth/client'
import { AnimatePresence, motion } from "framer-motion"


export default class MyApp extends App {
  static async getInitialProps({ctx}) {
    var s = await getSession(ctx)
    if (ctx.pathname != "/" && !s) {
      ctx.res.writeHead(302, {location: '/'})
      ctx.res.end()
    }
    return {}
  }

  render() {
    const { Component, pageProps, router } = this.props
    return (
      <Layout>
        <NavBar {...pageProps}/>
        <AnimatePresence key={router.route}>
          <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
            <Component {...pageProps} key={router.route}/>
          </motion.div>        
        </AnimatePresence>
          
      </Layout>
    ) 
  }
}

