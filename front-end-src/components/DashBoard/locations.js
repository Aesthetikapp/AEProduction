import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const containerStyle = {
	width: "400px",
	height: "400px",
};
const coords = { lat: 17.4152987, lng: 78.4572041 };
const coords1 = { lat: 17.4156436, lng: 78.45681119999999 };

const center = {
	lat: -3.745,
	lng: -38.523,
};

const mapStyle = [
	{
		elementType: "geometry",
		stylers: [
			{
				color: "#f5f5f5",
			},
		],
	},
	{
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d1d1d1",
			},
		],
	},
	{
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		elementType: "labels.text",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#616161",
			},
		],
	},
	{
		elementType: "labels.text.stroke",
		stylers: [
			{
				color: "#f5f5f5",
			},
		],
	},
	{
		featureType: "administrative.land_parcel",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#bdbdbd",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
			{
				color: "#eeeeee",
			},
		],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [
			{
				color: "#e5e5e5",
			},
		],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9e9e9e",
			},
		],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [
			{
				color: "#ffffff",
			},
		],
	},
	{
		featureType: "road.arterial",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#757575",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [
			{
				color: "#dadada",
			},
		],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#616161",
			},
		],
	},
	{
		featureType: "road.local",
		stylers: [
			{
				visibility: "off",
			},
		],
	},
	{
		featureType: "road.local",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9e9e9e",
			},
		],
	},
	{
		featureType: "transit.line",
		elementType: "geometry",
		stylers: [
			{
				color: "#e5e5e5",
			},
		],
	},
	{
		featureType: "transit.station",
		elementType: "geometry",
		stylers: [
			{
				color: "#eeeeee",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [
			{
				color: "#c9c9c9",
			},
		],
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#ffffff",
			},
		],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#9e9e9e",
			},
		],
	},
];

const Locations = (props) => {
	// console.log("location props", props);

	const _mapLoaded = (mapProps, map) => {
		map.setOptions({
			styles: mapStyle,
		});
	};
	const mapStyles = {
		width: "85%",
		height: "80%",
	};

	// Object.values(props.patients).forEach((pat) => {
	// 	console.log("lat", pat.address[0].location.split(",")[0] * 1);
	// 	console.log("lat", pat.address[0].location.split(",")[1] * 1);
	// });

	return (
		<Map
			zoom={10}
			// className="gmap"
			google={props.google}
			style={mapStyles}
			initialCenter={coords}
			onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
		>
			{Object.values(props.patients).map((pat) => {
				return (
					<Marker
						key={pat.id}
						position={{
							lat: pat.address[0].location.split(",")[0] * 1,
							lng: pat.address[0].location.split(",")[1] * 1,
						}}
						icon={{
							url: "../../images/mapmarker.png",
						}}
						title={pat.firstName}
					/>
				);
			})}
		</Map>
	);
};

export default GoogleApiWrapper((props) => ({
	apiKey: props.apikey,
}))(Locations);
