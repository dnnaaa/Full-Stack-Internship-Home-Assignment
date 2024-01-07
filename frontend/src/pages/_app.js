import '@/styles/globals.css'
import Interface1 from '@/Interface1'

export default function App({ Component, pageProps }) {
  return( <div>
  <Interface1 />
  <Component {...pageProps} />
</div>)
}
