import App, { Container } from 'next/app';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import store from '../src/store';

class MyApp extends App {
    static async getInitialProps ({ Component, ctx }) {
        return {
            pageProps: Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {}
        };
    }

    render () {
        const {
            Component,
            pageProps,
            store
        } = this.props;

        return (
            <Container>
                <Head>
                    <title>Employee Engagement Management System</title>
                </Head>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(store, { debug: true })(MyApp);
