import React, { Children } from 'react';
import Fade from 'react-reveal/Fade';

import './backgroundanimation.css';
const back_circle = require('../../Assets/LandingAssets/backcircle.png')

class backgroundanimation extends React.Component {
  render() {
    return (
      <div>
        <Fade right>
        <img className="background_circle" src={back_circle}></img>
        </Fade>
      </div>
    );
  }
}

export default backgroundanimation;