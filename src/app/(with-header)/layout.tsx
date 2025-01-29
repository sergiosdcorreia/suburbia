import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { CustomizerControlsProvider } from '../build/context'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <CustomizerControlsProvider>
        {children}
      </CustomizerControlsProvider>
      <Footer />
    </>
  )
}