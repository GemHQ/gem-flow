import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { Options } from "../../instructions/instructions";
import './dropdownSelector.css';

const DropdownSelector = ({ selectedOption, setSelectedOption }) => (
  <Dropdown
    className="Dropdown"
    selection options={Options}
    value={selectedOption}
    onChange={(e, { value }) => {
      setSelectedOption(value);
    }} 
  />
);

export default DropdownSelector;