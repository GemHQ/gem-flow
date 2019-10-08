import React from 'react';
import { observer } from 'mobx-react';
import './instructions.css';
import DropdownSelector from '../../basic/dropdownSelector/DropdownSelector';
import { Flows } from '../../../stores/Constants';

const InstructionsCmp = ({ uiStore }) => (
  <div className="InstructionsContainer">
    <div className="DropdownContainer">
      <DropdownSelector
        options={uiStore.dropdownOptions}
        selectedOption={uiStore.dropdownTitle}
        selectOption={option => uiStore.setFlow(option.value)} 
      />
    </div>
    <div className="Steps">
      {descriptions[uiStore.flow.id].map((Description, i) => <Step Description={Description} index={i} key={uiStore.flow.id} />)}
    </div>
  </div>
);

export default observer(InstructionsCmp);

const Highlighted = ({ color, children }) => <span style={{ color }}>{children}</span>;

const Step = ({ Description, index }) => (
  <div className="Step">
    <p className="StepTitle">{`STEP ${index + 1} `}<span className="Hyphen">----</span></p>
    {Description}
  </div>
);

const connectColor = Flows.Connect.primaryColor;
const onrampColor = Flows.Onramp.primaryColor

const descriptions = {
  [Flows.Connect.id]: [
    <p>Add a <Highlighted color={connectColor}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={connectColor}>connection</Highlighted> using the <Highlighted color={connectColor}>test credentials</Highlighted> provided in the sandbox mode</p>,
    <p>Exchange the returned <Highlighted color={connectColor}>public_token</Highlighted> for an <Highlighted color={connectColor}>access_token</Highlighted> that securely represents and authorizes later access to a connection</p>
  ],
  [Flows.Onramp.id]: [
    <p>Add a <Highlighted color={onrampColor}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={onrampColor}>connection</Highlighted> using the <Highlighted color={onrampColor}>test credentials</Highlighted> provided in the sandbox mode</p>,
    <p>Exchange the returned <Highlighted color={onrampColor}>public_token</Highlighted> for an <Highlighted color={onrampColor}>access_token</Highlighted> that securely represents and authorizes later access to a connection</p>
  ]
};

