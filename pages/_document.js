import Document, { Head, Main, NextScript } from 'next/document';
// @material-ui styles
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
    render() {
        return (
            <html lang='en'>
                <Head>
                    <meta charset="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="theme-color" content="#000000" />
                    <link rel='shortcut icon' href={require('../assets/img/logo.png')} />
                    {/* Fonts and icons */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
                    />
                    <link
                        href="https://fonts.googleapis.com/icon?family=Material+Icons"
                        rel="stylesheet"
                    />
                    <link
                        rel="stylesheet"
                        href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    />
                </Head>
                <body style={{margin: '0'}}>
                    <div id='page-transition'></div>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [
            <React.Fragment key='styles'>
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>
        ]
    };
};

export default MyDocument;