import '../styles/globals.css';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Smart Inventory',
  description: 'Manage your products efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto p-4">
          <Header />
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
