import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';

class MyDocument extends Document {
    render () {
        return (
            <html lang='pt-BR' dir='ltr'>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <meta name="theme-color" content="#000000" />
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
                    />
                    <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
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
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: WrappedComponent => props => sheets.collect(<WrappedComponent {...props} />)
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: (
            <React.Fragment>
                {initialProps.styles}
                {sheets.getStyleElement()}
            </React.Fragment>
        )
    };
};

export default MyDocument;
