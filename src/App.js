import React, { useState } from 'react';
import Table from './components/Table';
import Select from './components/Select';
import './App.css';
import data, { sortAirports } from './data';

const App = () => {
	const columns = [
		{ name: 'Airline', property: 'airline' },
		{ name: 'Source Airport', property: 'src' },
		{ name: 'Destination Airport', property: 'dest' }
	];
	const [ airline, setAirline ] = useState('all');
	const [ airport, setAirport ] = useState('all');

	const filterRoutes = (airline, airport) => {
		let routes = data.routes;
		if (airline !== 'all') {
			routes = routes.filter((route) => String(route.airline) === airline);
		}
		if (airport !== 'all') {
			routes = routes.filter((route) => route.src === airport);
		}
		return routes;
	};

	const airlinesToShow = filterRoutes(airline, airport);
	// airline !== 'all' || airport !== 'all'
	// 	? data.routes.filter((route) => String(route.airline) === airline && route.src === airport)
	// 	: data.routes;

	const formatValue = (_, value) => value;

	const handleAirlineSelect = (e) => {
		console.log('handle select airlines firing');
		setAirline(e.target.value);
	};
	const airlines = data.airlines;

	const handleAirportSelect = (e) => {
		console.log('handle select airports firing');
		setAirport(e.target.value);
	};
	const airports = sortAirports(data.airports);

	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Airline Routes</h1>
			</header>
			<Select
				options={airlines}
				valueKey="id"
				titleKey="name"
				allTitle="All Airlines"
				value=""
				onSelect={handleAirlineSelect}
			/>
			<Select
				options={airports}
				valueKey="code"
				titleKey="name"
				allTitle="All Airports"
				value=""
				onSelect={handleAirportSelect}
			/>
			<section>
				<Table className="routes-table" columns={columns} rows={airlinesToShow} format={formatValue} pageLimit={10} />
			</section>
		</div>
	);
};

export default App;
