import React from 'react';

const NumericNavBar = ({ currentStepIndex, numberOfSteps, goToStep }) => {
  return (
    <div className="NumericNavBarContainer">
      {[...Array(numberOfSteps)].map((n, i) => (
        <div className={`NumericNavButton ${i === currentStepIndex ? 'SelectedNumber' : ''}`}
          onClick={() => goToStep(i)}
          key={i}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}

export default NumericNavBar;
