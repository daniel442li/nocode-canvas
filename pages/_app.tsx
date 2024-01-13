import '../styles/styles.css'
import type { AppProps } from 'next/app'
import { WorkflowBoard } from '../components/workflowBoard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WorkflowBoard />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
