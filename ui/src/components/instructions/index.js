import React, { useState, useEffect } from 'react';
import { Dropdown, Label } from 'semantic-ui-react'
import './instructions.css';
import { Instructions, Options } from "./instructions";

export default () => {



  const [selectedOption, setSelectedOption] = useState(Options[0].value);
  const [instructions, setInstructions] = useState(Instructions.connect);

  useEffect(() => {

    const option = Options.filter(item => item.value === selectedOption);
    setInstructions(Instructions[option[0].value.toLowerCase()])

  }, [selectedOption])

  return (


    <div className="InstructionsContainer">

      <Dropdown
        className="Dropdown"
        selection options={Options}
        value={selectedOption}
        onChange={(e, { value }) => {
          setSelectedOption(value);
        }} />


      <div className="Stepper">
        {instructions.map((item, index) => {
          return (
            <div className="Step" key={index} >
              <Label className="StepNumber">STEP {index + 1}</Label>
              <div className="StepDescription">{item.description}</div>
            </div>
          );
        })}
      </div>




    </div>
  );
}
