import React, { useState } from 'react';
import './threeDots.css';

const ThreeDots = ({ menuOptions }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="ThreeDotsContainer" onClick={() => setShowMenu(!showMenu)}>
      <div className="OneDot" />
      <div className="OneDot" />
      <div className="OneDot" />
      { showMenu && <ThreeDotsMenu options={menuOptions} /> }
    </div>
  )
};

const ThreeDotsMenu = ({ options }) => (
  <div className="ThreeDotsMenu">
    {
      options.map(({ title, onClick }) => <p className="ThreeDotsOption" onClick={onClick} key={title}>{title}</p>)
    }
  </div>
);

export default ThreeDots;