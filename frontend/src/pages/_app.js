import "@/styles/globals.css";
import { FileProvider } from "../FileProvider";

export default function App({ Component, pageProps }) {
  return (
    <FileProvider>
      <Component {...pageProps} />
    </FileProvider>
  );
}
