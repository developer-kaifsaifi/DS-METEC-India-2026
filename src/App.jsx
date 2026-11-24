
import Banner from './components/Banner'
import Feedback from './components/Feedback'
import Header from './components/Header'
import { Toaster } from "sonner";

function App() {
  
  return (
    <>
     <Toaster
        position="top-right"
        richColors
        closeButton
        theme="light"
        duration={3000}
        className='font-ds'
      />
      <Header/>
      <Banner/>
      <Feedback/>
    </>
  )
}

export default App
