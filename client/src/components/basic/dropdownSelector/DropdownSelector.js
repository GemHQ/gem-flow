import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdownSelector.css';
import { observer} from 'mobx-react';
import { DownArrow, UpArrow } from './Arrow';

const DropdownSelector = ({ selectedOption, selectOption, options, selectedClassName, disabled, arrowClassName }) => {
  return (
  <Dropdown
    className="Dropdown"
    options={options}
    value={selectedOption}
    onChange={({ value }) => selectOption(value)} 
    // arrowClassName={`dropdownArrow ${arrowClassName || ''}`}
    arrowClosed={<DownArrow />}
    arrowOpen={<UpArrow />}
    placeholderClassName={selectedClassName}
    disabled={disabled}
  />
)};

export default observer(DropdownSelector);