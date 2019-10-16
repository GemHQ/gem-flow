import { inject, observer } from 'mobx-react';

export const injector = mapStoresToProps => Cmp => inject(mapStoresToProps)(observer(Cmp));

export const withPrimaryColor = (Cmp) => injector(({ uiStore }) => ({ primaryColor: uiStore.primaryColor }))(Cmp);

export const withFlowStore = (Cmp) => injector(({ flowStore }) => ({ flowStore }))(Cmp);