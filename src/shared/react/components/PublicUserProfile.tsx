import React from 'react';
import { Link } from 'react-router-dom';

import { PublicProject } from '../../contract/PublicProject';
import { ProjectPatch } from '../../web-app/store/ProjectsStore';
import Project from './Project';

export interface Props {
  user: any;
  projects?: PublicProject[];
  onPatchProject: (id: number, patch: ProjectPatch) => void;
}

class PublicUserProfile extends React.PureComponent<Props> {
  render(): JSX.Element {
    const { user, projects } = this.props;

    return (
      <div>
        <h3>@{user.slug}</h3>
        <div>{user.email}</div>
        <Link to="/@i-dont-exist">Go to non-existing user profile page</Link>
        <hr />
        {projects &&
          projects.map(project => (
            <Project
              project={project}
              key={project.id}
              onPatchProject={this.props.onPatchProject}
            />
          ))}
      </div>
    );
  }
}

export default PublicUserProfile;
