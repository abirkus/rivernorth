import React, {useState} from 'react';
import MapGL, {GeolocateControl} from 'react-map-gl';
//import config from '../config';
import 'mapbox-gl/dist/mapbox-gl.css';

const TOKEN =
	'pk.eyJ1IjoiYWJpcmt1cyIsImEiOiJjano4bHl0NjcwMWJkM21tcDIwYXJtNGNkIn0.TXcBCRGj8RvvCDdWnEY15Q';

const geolocateStyle = {
	float: 'left',
	margin: '50px',
	padding: '10px',
};

const Mymap = () => {
	const [viewport, setViewPort] = useState({
		width: '100%',
		height: 600,
		latitude: 41.8881084,
		longitude: -87.6320523,
		zoom: 12,
	});

	const _onViewportChange = viewport =>
		setViewPort({...viewport, transitionDuration: 3000});

	return (
		<div style={{margin: '0 auto'}}>
			<h1
				style={{
					textAlign: 'center',
					fontSize: '25px',
					fontWeight: 'bolder',
				}}>
				GeoLocator: Select your location
			</h1>
			<MapGL
				{...viewport}
				mapboxApiAccessToken={TOKEN}
				mapStyle='mapbox://styles/mapbox/dark-v8'
				onViewportChange={_onViewportChange}>
				<GeolocateControl
					style={geolocateStyle}
					positionOptions={{enableHighAccuracy: true}}
					trackUserLocation={true}
				/>
			</MapGL>
		</div>
	);
};

export default Mymap;
