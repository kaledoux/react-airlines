import React, { useState } from 'react';
import Table from './components/Table';
import Select from './components/Select';
import './App.css';
import data from './data';

const App = () => {
	const columns = [
		{ name: 'Airline', property: 'airline' },
		{ name: 'Source Airport', property: 'src' },
		{ name: 'Destination Airport', property: 'dest' }
	];
	const [ airline, setAirline ] = useState('all');
	const airlinesToShow =
		airline !== 'all' ? data.routes.filter((route) => String(route.airline) === airline) : data.routes;

	const formatValue = (_, value) => value;

	const handleAirlineSelect = (e) => {
		console.log('handle select airlines firing');
		setAirline(e.target.value);
	};
	const airlines = data.airlines;

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
			<section>
				<Table className="routes-table" columns={columns} rows={airlinesToShow} format={formatValue} pageLimit={10} />
			</section>
		</div>
	);
};

export default App;
