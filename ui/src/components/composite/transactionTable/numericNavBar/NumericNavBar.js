import React from 'react';
import './numericNavBar.css';

const NumericNavBar = ({ currentPage, numberOfPages, setCurrentPage }) => {
  return (
    <div className="NumericNavBarContainer">
      {[...Array(numberOfPages)].map((n, i) => (
        <p className={`NumericNavButton ${i === currentPage ? 'SelectedNumber' : ''}`}
          onClick={() => setCurrentPage(i)}
          key={i}
        >
          {i + 1}
        </p>
      ))}
    </div>
  );
}

export default NumericNavBar;
