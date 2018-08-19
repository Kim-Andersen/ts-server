import * as React from 'react';

import { PublicProject } from '../../contract/PublicProject';

interface Props {
  project: PublicProject;
}

export default function Project({ project }: Props) {
  return (
    <div style={{ marginTop: 40 }}>
      <h2>{project.title}</h2>
      {project.description && <p>{project.description}</p>}
    </div>
  );
}
