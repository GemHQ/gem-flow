import React from 'react';
import UIStore from '../stores/UIStore';
import Instructions from '../components/composite/instructions/Instructions';
import ProgressMap from '../components/composite/progressMap/ProgressMap';
import OnrampStore from '../stores/OnrampStore';
import { PrimaryColors } from '../stores/Constants';
import ConnectStore from '../stores/ConnectStore';

const uiStore = new UIStore();
const onrampStore = new OnrampStore();
const connectStore = new ConnectStore();

export default {
  title: 'Composite Components',
};

export const instructions = () => <Instructions uiStore={uiStore} />;

export const onrampProgressMap = () => <ProgressMap flowStore={onrampStore} primaryColor={PrimaryColors.Onramp} />

export const connectProgressMap = () => <ProgressMap flowStore={connectStore} primaryColor={PrimaryColors.Connect} />