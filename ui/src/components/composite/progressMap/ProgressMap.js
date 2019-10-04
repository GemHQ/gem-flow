import React from 'react';
import { observer } from 'mobx-react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';

const ProgressMap = ({ flowStore, primaryColor }) => (
  <div className="ProgressContainer">
    <div className="RectangleTitlesContainer">
      {flowStore.markerTitles.map(([title, subtitle]) => <RectangleTitle 
        key={title} 
        title={title} 
        subtitle={subtitle} 
        activeMarker={flowStore.activeMarker} 
        isCompleted={flowStore.dotsMap.get(title)}
        color={primaryColor}
      />)}
    </div>
    {/* <FlowDots /> */}
  </div>
);

export default observer(ProgressMap);