import App from 'next/app'

//Packages
import { getSession } from 'next-auth/client'
import { AnimatePresence, motion } from "framer-motion"

//Styling
import '../styles/globals.css'

//Components
import Layout from '../components/layout'
import NavBar from '../components/navbar'

const allowedPaths = ["/", "/auth/error"]

export default class MyApp extends App {
  
  static async getInitialProps({ctx}) {
      var s = await getSession(ctx)
      if (!allowedPaths.includes(ctx.pathname) && !s) {
          ctx.res.writeHead(302, {location: '/'})
          ctx.res.end()
      }

      return {
          props: {
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
            <motion.div className="contentParent" exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
              <Component {...pageProps} key={router.route} globalProps={this.props.props}/>
            </motion.div>
          </AnimatePresence>
        </Layout>
      ) 
  }
}

