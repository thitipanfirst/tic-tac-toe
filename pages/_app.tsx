import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Layouts } from '@/components/common/layout'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { Noto_Sans_Thai } from 'next/font/google'
import { store } from '@/stores/store'
import Head from 'next/head'
const NotoSansThai = Noto_Sans_Thai({ subsets: ['latin'] })

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
    const router = useRouter()

    return (
        <main className={NotoSansThai.className}>
            <Head>
                <title>TIC-TAC-TOE</title>
            </Head>
            <Provider store={store}>
                {router.pathname !== '/' ? (
                    <Layouts>

                        <Component {...pageProps} />
                    </Layouts>
                ) : (
                    <Component {...pageProps} />
                )}
            </Provider>
        </main>
    )
}
