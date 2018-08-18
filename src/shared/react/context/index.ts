import React from 'react';

import { IUserProfile } from '../../contract/UserProfile';


// export const UserProfileContext = (userProfile: IUserProfile) =>
//   React.createContext(userProfile);

// const UserProfileContext: Context<IUserProfile>;

export const UserProfileContext = React.createContext<IUserProfile | undefined>(
  undefined
);
