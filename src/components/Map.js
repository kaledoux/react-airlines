import React from 'react';

const Map = ({ routes, airports }) => {
	return (
		<svg className="map" viewBox="-180 -90 360 180">
			<g transform="scale(1 -1)">
				<image
					xlinkHref="equirectangular_world.jpg"
					href="equirectangular_world.jpg"
					x="-180"
					y="-90"
					height="100%"
					width="100%"
					transform="scale(1 -1)"
				/>

				{routes.map((route) => {
					const source = airports.find((airport) => airport.code === route.src);
					const destination = airports.find((airport) => airport.code === route.dest);
					const [ x1, y1, x2, y2 ] = [ source.long, source.lat, destination.long, destination.lat ];
					const keyCode = `${route.airline}${source.code}${destination.code}`;

					return (
						<g key={keyCode}>
							<circle className="source" cx={x1} cy={y1} r={0.8}>
								<title />
							</circle>
							<circle className="destination" cx={x2} cy={y2} r={0.8}>
								<title />
							</circle>
							<path d={`M${x1} ${y1} L ${x2} ${y2}`} />
						</g>
					);
				})}
			</g>
		</svg>
	);
};

export default Map;
