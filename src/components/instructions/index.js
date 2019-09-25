import React, { useState, useEffect } from 'react';
import { Step, Icon, Dropdown, Label } from 'semantic-ui-react'
import './Instructions.css';
import { Instructions } from "./Instructions";

export default () => {

  const options = [
    {
      key: "Connect",
      text: "Connect",
      value: "Connect"
    }, {
      key: "Buy",
      text: "Buy",
      value: "Buy"
    }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [instructions, setInstructions] = useState(Instructions.connect);

  useEffect(() => {

    const option = options.filter(item => item.value === selectedOption);
    setInstructions(Instructions[option[0].value.toLowerCase()])

  }, [selectedOption])

  return (


    <div className="Container">

      <Dropdown
        className="Dropdown"
        selection options={options}
        value={selectedOption}
        onChange={(e, { value }) => {
          setSelectedOption(value);
        }} />


      <div className="Stepper">

        {instructions.map((item, index) => {
          return (
            <div>
              <Label className="StepNumber">STEP {index + 1}</Label>
              <div>{item.description}</div>
              {/* <Label color="black" className="StepDescription">{item.description}</Label> */}
            </div>
          );
        })}

      </div>




    </div>
  );
}
