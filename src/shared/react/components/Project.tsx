import * as React from 'react';

import { PublicProject } from '../../contract/PublicProject';
import { ProjectPatch } from '../../web-app/store/ProjectsStore';

interface Props {
  project: PublicProject;
  onPatchProject: (id: number, patch: ProjectPatch) => void;
}

export default class UserProfile extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.addDescriptionClick = this.addDescriptionClick.bind(this);
  }

  render() {
    const { project } = this.props;

    return (
      <div style={{ marginTop: 40 }}>
        <h2>{project.title}</h2>
        {project.description && <p>{project.description}</p>}
        {!project.description && (
          <a href="#" onClick={this.addDescriptionClick}>
            Add a description
          </a>
        )}
      </div>
    );
  }

  addDescriptionClick(event: any) {
    event.preventDefault();
    this.props.onPatchProject(this.props.project.id, {
      description: 'Some new description here'
    });
  }
}
