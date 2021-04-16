import App from 'next/app'

//Packages
import { getSession } from 'next-auth/client'
import { AnimatePresence, motion } from "framer-motion"
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";

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

      return{
            props: {
              session: s,
          }
        } 
  }


  render() {
      const { Component, pageProps, router } = this.props

      const authMiddleware = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            authorization: "Bearer " + this.props.props.session.accessToken || null,
          }
        });
      
        return forward(operation);
      })

      const client = new ApolloClient({
          link: ApolloLink.from([
            authMiddleware,
            new HttpLink({
              uri: 'http://192.168.1.116:5000/graphql',
              credentials: 'same-origin'
            })
          ]),
          cache: new InMemoryCache(),
          defaultOptions: {
            watchQuery: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'ignore',
            },
            query: {
              fetchPolicy: 'no-cache',
              errorPolicy: 'all',
            }
          }
      });
    
      return (
        <ApolloProvider client={client}>
           <Layout>
            <NavBar globalProps={this.props.props} {...pageProps}/>
            <AnimatePresence key={router.route}>
              <motion.div style={{height: '100%'}} exit={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}}>
                <Component {...pageProps} key={router.route} globalProps={this.props.props}/>
              </motion.div>
            </AnimatePresence>
          </Layout>
        </ApolloProvider>
       
      ) 
  }
}

