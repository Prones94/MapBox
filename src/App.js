import * as React from 'react';
import ReactMapGL, {FlyToInterpolator, WebMercatorViewport, Marker} from 'react-map-gl';
import DeckGL from '@deck.gl/react'
import {PathLayer} from '@deck.gl/layers'
// 3rd-party easing functions
// import d3 from 'd3-ease';
// import pin from './assets/images/pin.png'
import flatpin from './assets/images/red-pin.png'

export default function App({viewState}) {
  const [viewport, setViewport] = React.useState({
    width: 800,
    height: 600,
    latitude: 37.78,
    longitude: -122.45,
    zoom: 14
  });
  const goToSF = () => {
    const {longitude, latitude, zoom} = new WebMercatorViewport(viewport)
      .fitBounds([[-122.4, 37.7], [-122.5, 37.8]], {
          padding: 20,
          offset: [0, -100]
        });
    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
      // transitionEasing: d3.easeCubic
    });
  };

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

  const roadTripData = {
    path: [[37.68493,-122.490050], [37.7866555224718,-122.41737904607598]],
    name: 'Geary - Daly City',
    color:[255,0,0]
  }

  // const markers = React.useMemo(() => data.map(city => {
  //   <Marker key="San Francisco" longitude={37.68493} longitude={-122.49050}>
  //     <img src="./assets/images/pin.png" alt="pin"/>
  //   </Marker>
  // }), [props.data])

  const layer = new PathLayer({
    id: 'road-trip',
    data: roadTripData,
    pickable: true,
    widthScale: 20,
    widthMinPixels: 2,
    getPath: d => d.path,
    getColor: (d) => {
      const hex = d.color;
      // convert to RGB
      return hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16));
    },
    getWidth: d => 5,
    parameters: {
      depthMask: false
    },
  })

  new DeckGL({
    mapStyle: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
    initialViewState: {
      latitude: 37.78,
      longitude: -122.45,
      zoom: 10,
      pitch: 30,
      bearing: 0
    },
    controller: true,
    getToolTip:({ object }) => object && object.name,
    layers: [layer]
  })

  return (
    <div>
      <ReactMapGL {...viewport} onViewportChange={setViewport}>

        <Marker latitude={37.68493} longitude={-122.49050} offsetLeft={-20} offsetTop={-10}>
        <img style={{"height": "50px"}} src={flatpin} alt="pin"/>
        </Marker>
        <Marker latitude={37.7866555224718} longitude={-122.41737904607598} offsetLeft={-20} offsetTop={-10}>
        <img style={{"height": "50px"}} src={flatpin} alt="pin"/>
        </Marker>
      </ReactMapGL>
      <button onClick={goToNYC}>New York City</button>
      <button onClick={goToSF}>San Francisco</button>
    </div>
  );
}