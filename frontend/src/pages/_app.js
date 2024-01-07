// pages/_app.js
import { FileProvider } from '../context/FileContext';
import '../styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <FileProvider>
      <Component {...pageProps} />
    </FileProvider>
  );
}

export default App;
