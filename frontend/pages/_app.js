import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { ApolloProvider } from '@apollo/client'
import Page from '../components/Page'
import '../components/styles/nprogress.css'
import withData from '../lib/withData'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
    render() {
        const { Component, pageProps, apollo } = this.props
        return (
            <ApolloProvider client={apollo}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        )
    }
}

// async default Next method

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered

// MyApp.getInitialProps = async (context) => {
//     const { Component, ctx } = context
//     let pageProps = {}
//     if (Component.getInitialProps) {
//         pageProps = await Component.getInitialProps(ctx)
//     }
//     pageProps.query = ctx.query // this gives us query variables from the url, ex: /products
//     return { pageProps }
// }

export default withData(MyApp)
