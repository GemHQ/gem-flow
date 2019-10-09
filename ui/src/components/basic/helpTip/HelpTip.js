import React from 'react';
import Tooltip from 'react-tooltip';
import './helpTip.css';

const HelpTip = ({ text }) => (
  <div className="QuestionCircle" data-tip={text}>
    <p>?</p>
    <Tooltip
      place="top"
      type="light"
      effect="solid"
      className="CustomTooltip"
    />
  </div>
);

export default HelpTip;