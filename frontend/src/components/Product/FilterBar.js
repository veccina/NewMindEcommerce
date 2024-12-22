// frontend/src/components/Product/FilterBar.js
import React, { useState } from 'react';

function FilterBar({ onFilterChange }) {
    const [category, setCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [search, setSearch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the filter values to the parent component
        onFilterChange({ category, minPrice, maxPrice, search });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: 10 }}>
                Category:
                <select
                    style={{ marginLeft: 5 }}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Electronics">Electronics</option>
                    {/* Add other categories if desired */}
                </select>
            </label>

            <label style={{ marginRight: 10 }}>
                Min Price:
                <input
                    type="number"
                    style={{ marginLeft: 5, width: 80 }}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </label>

            <label style={{ marginRight: 10 }}>
                Max Price:
                <input
                    type="number"
                    style={{ marginLeft: 5, width: 80 }}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </label>

            <label style={{ marginRight: 10 }}>
                Search:
                <input
                    type="text"
                    style={{ marginLeft: 5 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>

            <button type="submit">Apply Filter</button>
        </form>
    );
}

export default FilterBar;
