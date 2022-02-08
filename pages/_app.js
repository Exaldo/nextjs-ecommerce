import Layout from '../components/Layout'
import '../styles/globals.css'

/* Redux */
import store from '../redux/store';
import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }) {
  return (

    /* Main app page, every file under "pages" will be a route: example about.js wil be host:3000/about  */
    
    // Layout: this component contains navbar and footer
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
