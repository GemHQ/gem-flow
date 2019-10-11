import React from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdownSelector.css';
import { observer} from 'mobx-react';

const DropdownSelector = ({ selectedOption, selectOption, options, selectedClassName }) => {
  return (
  <Dropdown
    className="Dropdown"
    options={options}
    value={selectedOption}
    onChange={({ value }) => selectOption(value)} 
    arrowClassName='dropdownArrow'
    placeholderClassName={selectedClassName}
  />
)};

export default observer(DropdownSelector);