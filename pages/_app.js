import '../styles/global.scss';
import Head from 'next/head';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from 'next/app';
import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../store/rootreducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { SnackbarProvider } from 'notistack';
import { LangProvider } from '../constants/langcontext';

const middlewares = [thunk, logger];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

class MyApp extends App {
  // componentDidMount(){
  //   firebase.firestore().collection('aya-pay').add({
  //     orderId:'12',
  //     invoiceId:'1'
  //   })
  // }
  componentDidMount() {}

  /* static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //Anything returned here can be access by the client
    return { pageProps: pageProps };
  } */

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    //Information that was returned  from 'getInitialProps' are stored in the props i.e. pageProps
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Head>
          <title>Aya Zay</title>
        </Head>
        <Provider store={store}>
          <LangProvider>
            <SnackbarProvider>
              <Component {...pageProps} />
            </SnackbarProvider>
          </LangProvider>
        </Provider>
      </div>
    );
  }
}
const makeStore = () => store;

const wrapper = createWrapper(makeStore, { debug: true });

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
