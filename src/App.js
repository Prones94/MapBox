import * as React from 'react';
import ReactMapGL, {FlyToInterpolator} from 'react-map-gl';
// 3rd-party easing functions
// import d3 from 'd3-ease';

export default function App() {
  const [viewport, setViewport] = React.useState({
    width: 800,
    height: 600,
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14
  });

  const goToNYC = () => {
    setViewport({
      ...viewport,
      longitude: -74.1,
      latitude: 40.7,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: d3.easeCubic
    });
  };

  return (
    <div>
      <ReactMapGL {...viewport} onViewportChange={setViewport} />
      <button onClick={goToNYC}>New York City</button>
    </div>
  );
}