import * as React from 'react';
import { match } from 'react-router';

interface MatchParams {
  slug: string;
}

export interface Props {
  match: match<MatchParams>;
}

export default function UserProfile({ match }: Props) {
  return (
    <div className="user-profile">
      <h1>{match.params.slug}</h1>
    </div>
  );
}
