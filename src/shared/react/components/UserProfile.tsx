import * as React from 'react';
import { match } from 'react-router';

interface MatchParams {
  slug: string;
}

interface IProfileData {
  user: {
    fullName: string;
  };
}

export interface Props {
  match: match<MatchParams>;
  profileData: IProfileData;
}

class UserProfile extends React.Component<Props> {
  render(): JSX.Element {
    console.log(`UserProfile.render props`, this.props);
    const { profileData, match } = this.props;

    return (
      <div>
        <h5>user profile for slug "{match.params.slug}"</h5>
        {/* <h1>{profileData.user.fullName}</h1> */}
      </div>
    );
  }

  static fetchInitialData(slug: string): Promise<IProfileData> {
    console.log(`UserProfile.fetchInitialData...`, { slug });
    return Promise.resolve({ user: { fullName: 'Claus Riskjær' } });
  }
}

// function UserProfile({ profileData }: Props) {
//   return (
//     <div>
//       {/* <h5>{match.params.slug}</h5> */}

//       <UserProfileContext.Consumer>
//         {userProfile =>
//           userProfile && (
//             <div>
//               <h1>{profileData.user.fullName}</h1>
//             </div>
//           )
//         }
//       </UserProfileContext.Consumer>
//     </div>
//   );
// }

export default UserProfile;
