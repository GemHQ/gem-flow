import React from 'react';
import { observer } from 'mobx-react';
import './instructions.css';
import DropdownSelector from '../../basic/dropdownSelector/DropdownSelector';
import { Flows, FlowIds } from '../../../stores/Constants';

const InstructionsCmp = ({ uiStore }) => (
  <div className="InstructionsContainer">
    <div className="DropdownContainer">
      <DropdownSelector
        options={uiStore.dropdownOptions}
        selectedOption={uiStore.flow.dropdownTitle}
        selectOption={uiStore.setFlow}
        selectedClassName={uiStore.flow.colorClassname}
      />
    </div>
    <div className="Steps">
      {descriptions[uiStore.flow.id].map((Description, i) => <Step Description={Description} index={i} key={`${uiStore.flow.id}-${i}`} />)}
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
const onrampColor = Flows.Onramp.primaryColor;
const transferColor = Flows.Transfer.primaryColor;

const descriptions = {
  [FlowIds.ONRAMP]: [
    <p>Add a <Highlighted color={onrampColor}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={onrampColor}>profile</Highlighted> using a user's KYC data</p>,
    <p>Create a <Highlighted color={onrampColor}>connection</Highlighted> using the <Highlighted color={onrampColor}>test credentials</Highlighted> provided in the sandbox mode</p>,
    <p>Link an <Highlighted color={onrampColor}>account</Highlighted> to the connection.</p>,
    <p>Excecute a <Highlighted color={onrampColor}>transaction</Highlighted> using the account.</p>,  
  ],
  [FlowIds.CONNECT]: [
    <p>Add a <Highlighted color={connectColor}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={connectColor}>connection</Highlighted> using <Highlighted color={connectColor}>exchange credentials</Highlighted></p>,
    <p>View the <Highlighted color={connectColor}>accounts</Highlighted> available in the <Highlighted color={connectColor}>connection</Highlighted></p>,
  ],
  [FlowIds.TRANSFER]: [
    <p>Add a <Highlighted color={transferColor}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={transferColor}>connection</Highlighted> using <Highlighted color={transferColor}>exchange credentials</Highlighted></p>,
    <p>View the <Highlighted color={transferColor}>accounts</Highlighted> available in the <Highlighted color={transferColor}>connection</Highlighted></p>,
    <p>Excecute a <Highlighted color={transferColor}>transfer</Highlighted> to a supplied blockchain address.</p>, 
  ]
};

