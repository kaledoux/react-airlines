import React from 'react';

const Select = ({ options = [], valueKey = '', titleKey = '', allTitle = 'all', value = 'all', onSelect }) => {
	return (
		<select onClick={(e) => onSelect(e)}>
			<option key="all" value="all">
				{allTitle}
			</option>
			{options.map((option) => (
				<option key={option[valueKey]} value={option[valueKey]}>
					{option[titleKey]}
				</option>
			))}
		</select>
	);
};

export default Select;
