import React from 'react';
import UIStore from '../stores/UIStore';
import Instructions from '../components/composite/instructions/Instructions';
import ProgressMap from '../components/composite/progressMap/ProgressMap';
import { Flows } from '../stores/Constants';

const uiStore = new UIStore();
const connectProgressStore = uiStore.progressMaps.get(Flows.Connect.id);
const onrampProgressStore = uiStore.progressMaps.get(Flows.Onramp.id);
onrampProgressStore.fillDot('User');
onrampProgressStore.setActiveMarker('Profile');

export default {
  title: 'Composite Components',
};

export const instructions = () => <Instructions uiStore={uiStore} />;

export const onrampProgressMap = () => <ProgressMap progressStore={onrampProgressStore} primaryColor={Flows.Onramp.primaryColor} />

export const connectProgressMap = () => <ProgressMap progressStore={connectProgressStore} primaryColor={Flows.Connect.primaryColor} />