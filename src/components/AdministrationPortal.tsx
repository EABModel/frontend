import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const AdministrationPortal: FC = () => {
  const history = useHistory();

  return (
    <div>
      <Typography variant="h2" color="textSecondary">
        Administration Portal
      </Typography>
    </div>
  );
};

export default AdministrationPortal;
