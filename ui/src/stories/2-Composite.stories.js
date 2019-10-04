import React from 'react';
import UIStore from '../stores/UIStore';
import Instructions from '../components/composite/instructions/Instructions';

const uiStore = new UIStore();

export default {
  title: 'Composite Components',
};

export const instructions = () => <Instructions uiStore={uiStore} />;