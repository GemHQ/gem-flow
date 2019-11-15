import { inject, observer } from 'mobx-react';
import { Flows } from './Constants';

export const injector = mapStoresToProps => Cmp => inject(mapStoresToProps)(observer(Cmp));

// default to Onramp color is not in Provider context (for storybook)
export const withPrimaryColor = (Cmp) => injector(({ uiStore }) => ({ 
  primaryColor: uiStore ? uiStore.primaryColor : Flows.Onramp.primaryColor
}))(Cmp);

export const withFlowStore = (Cmp) => injector(({ flowStore }) => ({ flowStore }))(Cmp);
export const withUiStore = (Cmp) => injector(({ uiStore }) => ({ uiStore }))(Cmp);
export const withStores = (Cmp) => injector(stores => stores)(Cmp);
