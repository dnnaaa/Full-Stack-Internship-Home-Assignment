import '@/styles/globals.css'
import { FileProvider } from '@/context/FileContext'

export default function App({ Component, pageProps }) {
  return <FileProvider>
  <Component {...pageProps} />
</FileProvider>
}
