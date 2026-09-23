import { createRoot } from 'react-dom/client';

import { JsonDemo } from './json-demo';
const container = document.getElementById('root');
if (!container) throw new Error('JSON demo root is missing.');
createRoot(container).render(<JsonDemo />);
