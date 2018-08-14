import * as React from 'react';
import { Button } from 'semantic-ui-react';

export interface Props {
  email: string;
}

export default function App({ email }: Props) {
  return (
    <div className="hello">
      <div className="greeting">Hello {email}</div>

      <Button>Click Here</Button>
    </div>
  );
}
