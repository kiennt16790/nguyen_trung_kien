import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer, Bounce } from 'react-toastify';
import { Swap } from './pages/swap';
import { ThirdwebProvider } from 'thirdweb/react';
import { Header } from './components/header';

const queryClient = new QueryClient();

function App() {
  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col font-mono">
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
          <Header />
          <Swap />
        </div>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default App;
