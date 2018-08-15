import * as React from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';

export interface Props {
  email: string;
}

const friendOptions = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',
    image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
  }
];

export default function App({ email }: Props) {
  return (
    <div className="hello">
      <div className="greeting">Hello {email}</div>

      <Button>Click Here</Button>

      <Input size="huge">
        <Dropdown
          placeholder="Select Friend"
          fluid
          selection
          options={friendOptions}
        />
      </Input>

      <Dropdown
        size="huge"
        placeholder="Select Friend"
        fluid
        selection
        options={friendOptions}
      />
    </div>
  );
}
