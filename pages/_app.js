import '../styles/globals.css'
import Layout from '../components/layout'
import NavBar from '../components/navbar'
import App from 'next/app'
import { getSession } from 'next-auth/client'
import { AnimatePresence, motion } from "framer-motion"

const allowedPaths = ["/", "/auth/error"]

export default class MyApp extends App {
  static async getInitialProps({ctx}) {
      var s = await getSession(ctx)
      if (!allowedPaths.includes(ctx.pathname) && !s) {
          ctx.res.writeHead(302, {location: '/'})
          ctx.res.end()
      }
      return {
          props: { //set global auth props here :)
              session: s
          }
      }
  }

  render() {
      const { Component, pageProps, router } = this.props
      return (
        <Layout>
          <NavBar globalProps={this.props.props} {...pageProps}/>
          <AnimatePresence key={router.route}>
            <motion.div exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
              <Component {...pageProps} key={router.route} globalProps={this.props.props}/>
            </motion.div>        
          </AnimatePresence>
            
        </Layout>
      ) 
  }
}

