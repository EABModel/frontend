import React, { FC } from 'react';
import { useHistory } from "react-router-dom";

export const About: FC = () => {
  const history = useHistory();

  const goToHomePage = () => {
    history.push('/');
  }
  return (
    <div>
      <p>This is an about page</p>
      <button type="button" onClick={goToHomePage}>
          Go back
      </button>
    </div>
  );
};
