import App from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import Page from '../components/Page'

import '../components/styles/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <Page>
                <Component {...pageProps} />
            </Page>
        )
    }
}

export default MyApp
