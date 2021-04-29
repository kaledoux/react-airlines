import React, { useState } from 'react';
import RouteTable from './components/RouteTable';
import Select from './components/Select';
import Map from './components/Map';
import './App.css';
import data, { sortAirports } from './data';
import { Button } from 'react-bootstrap';

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
			routes = routes.filter((route) => route.src === airport || route.dest === airport);
		}
		return routes;
	};

	const filteredRoutes = filterRoutes(airline, airport);

	const filteredAirlines = data.airlines.map((airline) => {
		const active = !!filteredRoutes.find((route) => route.airline === airline.id);
		return Object.assign({}, airline, { active });
	});

	const airports = sortAirports(data.airports);
	const filteredAirports = airports.map((airport) => {
		const active = !!filteredRoutes.find((route) => route.src === airport.code || route.dest === airport.code);
		return Object.assign({}, airport, { active });
	});

	const handleAirlineSelect = (e) => {
		setAirline(e.target.value);
	};

	const handleAirportSelect = (e) => {
		setAirport(e.target.value);
	};

	const handleResetFilters = () => {
		setAirline('all');
		setAirport('all');
	};

	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Airline Routes</h1>
			</header>
			<section>
				<Map routes={filteredRoutes} airports={filteredAirports} />
			</section>
			<section className="filters">
				<h3>Filter flights by airline and/or airport!</h3>
				<p>
					Select flights on:
					<Select
						options={filteredAirlines}
						valueKey="id"
						titleKey="name"
						allTitle="All Airlines"
						value={airline}
						enableKey="active"
						onSelect={handleAirlineSelect}
					/>
				</p>
				<p>
					Travelling <i>to</i> or <i>from</i>:
					<Select
						options={filteredAirports}
						valueKey="code"
						titleKey="name"
						allTitle="All Airports"
						value={airport}
						enableKey="active"
						onSelect={handleAirportSelect}
					/>{' '}
				</p>
				<Button onClick={() => handleResetFilters()}>Clear Filters</Button>
			</section>
			<section>
				<RouteTable className="routes-table" columns={columns} rows={filteredRoutes} pageLimit={25} />
			</section>
		</div>
	);
};

export default App;
