import '../styles/globals.css'

import Layout from '../components/layout'

import NavBar from '../components/navbar'


function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <NavBar {...pageProps}/>
        <Component {...pageProps}/>
      </Layout>
  ) 
}

export default MyApp
