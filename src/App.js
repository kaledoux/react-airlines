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

	const formatValue = (_, value) => value;

	const handleAirlineSelect = (e) => {
		setAirline(e.target.value);
	};
	const airlines = data.airlines;

	const handleAirportSelect = (e) => {
		setAirport(e.target.value);
	};
	const airports = sortAirports(data.airports);

	const handleResetFilters = () => {
		setAirline('all');
		setAirport('all');
	};

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
				value={airline}
				onSelect={handleAirlineSelect}
			/>
			<Select
				options={airports}
				valueKey="code"
				titleKey="name"
				allTitle="All Airports"
				value={airport}
				onSelect={handleAirportSelect}
			/>
			<button onClick={() => handleResetFilters()}>Clear Filters</button>
			<section>
				<Table className="routes-table" columns={columns} rows={airlinesToShow} format={formatValue} pageLimit={10} />
			</section>
		</div>
	);
};

export default App;
