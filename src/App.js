import React, { useState } from 'react';
import Table from './components/Table';
import './App.css';
import data from './data';

const App = () => {
	const columns = [
		{ name: 'Airline', property: 'airline' },
		{ name: 'Source Airport', property: 'src' },
		{ name: 'Destination Airport', property: 'dest' }
	];
	const [ airline, setAirline ] = useState('');
	const airlinesToShow =
		airline !== '' ? data.routes.filter((route) => String(route.airline) === airline) : data.routes;

	const formatValue = (_, value) => value;

	const handleAirlineSelect = (e) => {
		e.preventDefault();
		console.log('option value', e.target.value);
		setAirline(e.target.value);
	};

	return (
		<div className="app">
			<header className="header">
				<h1 className="title">Airline Routes</h1>
			</header>
			<select onClick={(e) => handleAirlineSelect(e)}>
				<option key="none" value="">
					All Airlines
				</option>
				{data.airlines.map((airline) => (
					<option key={airline.id} value={airline.id}>
						{airline.name}
					</option>
				))}
			</select>
			<section>
				<Table className="routes-table" columns={columns} rows={airlinesToShow} format={formatValue} pageLimit={40} />
			</section>
		</div>
	);
};

export default App;
