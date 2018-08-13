import React from 'react';
import ReactDOM from 'react-dom';

import Hello from '../shared/react/components/App';

ReactDOM.hydrate(
  <Hello name="TypeScript" enthusiasmLevel={10} />,
  document.getElementById('root') as HTMLElement
);
