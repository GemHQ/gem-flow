import React from 'react';
import { observer } from 'mobx-react';
import './progressMap.css';
import RectangleTitle from './rectangleTitle/RectangleTitle';
import FlowDots from './flowDots/FlowDots';

const ProgressMap = ({ progressStore, primaryColor }) => (
  <div className="ProgressContainer">
    <div className="RectangleTitlesContainer">
      {progressStore.markerTitles.map(([title, subtitle]) => <RectangleTitle 
        key={title} 
        title={title} 
        subtitle={subtitle} 
        activeMarker={progressStore.activeMarker} 
        isCompleted={progressStore.dotsMap.get(title)}
        color={primaryColor}
      />)}
    </div>
    <FlowDots 
      dots={progressStore.dots} 
      activeMarker={progressStore.activeMarker} 
      primaryColor={primaryColor} 
    />
  </div>
);

export default observer(ProgressMap);