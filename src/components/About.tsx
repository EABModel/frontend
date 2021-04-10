import React from 'react';
import { useHistory } from "react-router-dom";

function About() {
  const history = useHistory();

  const goToHomePage = () => {
    history.push('/');
  }
  return (
    <div>
      <p>This is an about page</p>
      <button type="button" onClick={goToHomePage}>
          Go back to home
      </button>
    </div>
  );
}

export default About;