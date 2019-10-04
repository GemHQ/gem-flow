import React from 'react';
import { observer } from 'mobx-react';
import './instructions.css';
import DropdownSelector from '../../basic/dropdownSelector/DropdownSelector';
import { FlowNames, PrimaryColors } from '../../../stores/Constants';

const InstructionsCmp = ({ uiStore }) => (
  <div className="InstructionsContainer">
    <div className="DropdownContainer">
      <DropdownSelector
        options={Object.values(FlowNames)}
        selectedOption={uiStore.flowName}
        selectOption={option => uiStore.setFlowName(option)} 
      />
    </div>
    <div className="Steps">
      {descriptions[uiStore.flowName].map((Description, i) => <Step Description={Description} index={i} key={`${uiStore.flowName}-${i}`} />)}
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

const descriptions = {
  [FlowNames.Connect]: [
    <p>Add a <Highlighted color={PrimaryColors.Connect}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={PrimaryColors.Connect}>connection</Highlighted> using the <Highlighted color={PrimaryColors.Connect}>test credentials</Highlighted> provided in the sandbox mode</p>,
    <p>Exchange the returned <Highlighted color={PrimaryColors.Connect}>public_token</Highlighted> for an <Highlighted color={PrimaryColors.Connect}>access_token</Highlighted> that securely represents and authorizes later access to a connection</p>
  ],
  [FlowNames.Onramp]: [
    <p>Add a <Highlighted color={PrimaryColors.Onramp}>new user</Highlighted></p>,
    <p>Create a <Highlighted color={PrimaryColors.Onramp}>connection</Highlighted> using the <Highlighted color={PrimaryColors.Onramp}>test credentials</Highlighted> provided in the sandbox mode</p>,
    <p>Exchange the returned <Highlighted color={PrimaryColors.Onramp}>public_token</Highlighted> for an <Highlighted color={PrimaryColors.Onramp}>access_token</Highlighted> that securely represents and authorizes later access to a connection</p>
  ]
};

