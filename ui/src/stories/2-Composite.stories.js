import React from 'react';
import UIStore from '../stores/UIStore';
import Instructions from '../components/composite/instructions/Instructions';
import { ProgressMap } from '../components/composite/progressMap/ProgressMap';
import { Flows, ScreenNames } from '../stores/Constants';

const uiStore = new UIStore();
const connectProgressStore = uiStore.progressMaps.get(Flows.Connect.id);
const onrampProgressStore = uiStore.progressMaps.get(Flows.Onramp.id);
onrampProgressStore.setCurrentScreen(ScreenNames.PROFILE);

export default {
  title: 'Composite Components',
};

export const instructions = () => <Instructions uiStore={uiStore} />;

export const onrampProgressMap = () => <ProgressMap progressStore={onrampProgressStore} primaryColor={Flows.Onramp.primaryColor} dots={[ScreenNames.USER, true]} />

export const connectProgressMap = () => <ProgressMap progressStore={connectProgressStore} primaryColor={Flows.Connect.primaryColor} />