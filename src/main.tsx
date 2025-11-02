import { createRoot } from 'react-dom/client';
import App from './App';

// Check if the root element exists before rendering
const rootElement = document.getElementById('root');

createRoot(rootElement!).render(<App />);
