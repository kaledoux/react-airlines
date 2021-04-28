import React, { Component } from 'react';
import data, { getAirlineById, getAirportByCode } from './data';
import './App.css';

const App = () => {
	// const getAirlineById = (id) => {
	// 	const airline = data.airlines.find((airline) => airline.id === id);
	// 	return airline.name;
	// };

	// const getAirportByCode = (code) => {
	// 	const airport = data.airports.find((airport) => airport.code === code);
	// 	return airport.name;
	// };
	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Airline Routes</h1>
			</header>
			<section>
				<table>
					<thead>
						<tr>
							<td>Airline</td>
							<td>Source Airport</td>
							<td>Destination Airport</td>
						</tr>
					</thead>
					<tbody>
						{data.routes.map((route) => {
							return (
								<tr>
									<td>{getAirlineById(route.airline)}</td>
									<td>{getAirportByCode(route.src)}</td>
									<td>{getAirportByCode(route.dest)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</section>
		</div>
	);
};

export default App;
