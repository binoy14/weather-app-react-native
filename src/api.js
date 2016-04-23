import _ from 'lodash';
import config from '../config';

let rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + config.id;

let kelvinToF = (kelvin) => {
	return Math.round((kelvin - 273.15) * 1.8 + 32) + ' ˚F';
};

export default (latitude, longitude) => {
	let url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

	return fetch(url)
		.then((response) => {
			return response.json()
		})
		.then((json) => {
			return {
				city: json.name,
				temprature: kelvinToF(json.main.temp),
				description: _.capitalize(json.weather[0].description),
			};
		});
};