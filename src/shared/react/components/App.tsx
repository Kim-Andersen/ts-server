import * as React from 'react';

export interface Props {
  email: string;
}

export default function App({ email }: Props) {
  return (
    <div className="hello">
      <div className="greeting">Hello {email}</div>
    </div>
  );
}
