import React, { useState, useEffect } from 'react'; import React, { useState, useEffect } from 'react'; import React, { useState, useEffect } from 'react'; import React, { useState, useEffect } from 'react'; import React, { useState, useEffect } fr    return (

import { Search, X, Filter } from 'lucide-react';

import { eventsAPI } from '../services/api'; import { Search, X } from 'lucide-react';



const dates = [import { eventsAPI } from '../services/api'; import { Search, X } from 'lucide-react';

'All',

    'Today',

    'This Week',

    'This Month',const dates = [import { eventsAPI } from '../services/api'; import { Search, X } from 'lucide-react'; <div className="mb-6">

        ];

        'All',

        const EventFilters = ({filters, setFilters}) => {

    const [categories, setCategories] = useState(['All']);    'Today',

        const [locations, setLocations] = useState(['All']);

        const [loading, setLoading] = useState(false);    'This Week',

        const [showFilters, setShowFilters] = useState(false);

        'This Month',const dates = [import {eventsAPI} from '../services/api';            {/* Search Bar */}

    // Fetch unique categories and locations from API

    useEffect(() => {    ];

        const fetchFilterOptions = async () => {

            try {'All',

            setLoading(true);

        const response = await eventsAPI.getAllEvents();    const EventFilters = ({filters, setFilters}) => {



                // Extract unique categories    const [categories, setCategories] = useState(['All']);    'Today',            <div className="relative max-w-md mx-auto mb-4">

                const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))];

            setCategories(uniqueCategories.filter(Boolean)); // Filter out null/undefined        const [locations, setLocations] = useState(['All']);



                // Extract unique locations        const [loading, setLoading] = useState(false);    'This Week',

                const uniqueLocations = ['All', ...new Set(response.events.map(event => event.location))];

            setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefined

            } catch (err) {

                console.error('Error fetching filter options:', err);    // Fetch unique categories and locations from API    'This Month',const dates = [                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />

                // Set default campus categories if API fails

                setCategories(['All', 'Academic', 'Sports', 'Cultural', 'Social', 'Career', 'Workshop']);    useEffect(() => {

                setLocations(['All', 'Main Campus', 'Library', 'Auditorium', 'Sports Complex', 'Student Center']);

            } finally {        const fetchFilterOptions = async () => {];

            setLoading(false);

            }        try {

            };

            setLoading(true);    'All',                <input

                fetchFilterOptions();

    }, []);            const response= await eventsAPI.getAllEvents();



            return (        const EventFilters = ({filters, setFilters}) => {

                <div className="mb-6">

                    {/* Search Bar */}                // Extract unique categories

                    <div className="relative max-w-lg mx-auto mb-4">

                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />                const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))];    const [categories, setCategories] = useState(['All']);    'Today',                    type="text"

                        <input

                            type="text" setCategories(uniqueCategories.filter(Boolean)); // Filter out null/undefined

                        placeholder="Search events by name, description, organizer..."

                        value={filters.search || ''}        const [locations, setLocations] = useState(['All']);

                        onChange={e => setFilters({ ...filters, search: e.target.value })}

                        className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"                // Extract unique locations

                        disabled={loading}

                />                const uniqueLocations = ['All', ...new Set(response.events.map(event => event.location))];    const [loading, setLoading] = useState(false);    'This Week',                    placeholder="Search events by name, description, or organizer..."

                        {filters.search && (

                            <button setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefined

                        onClick={() => setFilters({ ...filters, search: '' })}

                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"            } catch (err) {

                            disabled = { loading }

                            > console.error('Error fetching filter options:', err);

                        <X size={20} />

                    </button>            } finally {    // Fetch unique categories and locations from API    'This Month',                    value={filters.search || ''}

                )}

                </div>            setLoading(false);



            {/* Filter Toggle Button */}            }    useEffect(() => {

                <div className="text-center mb-4">

                    <button        };

                    onClick={() => setShowFilters(!showFilters)}

                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all duration-300 border border-blue-200"        const fetchFilterOptions = async () => {];                    onChange={e => setFilters({ ...filters, search: e.target.value })}

                >

                    <Filter size={18} />        fetchFilterOptions();

                    <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>

                </button>}, []);            try {

            </div>



        {/* Filter Dropdowns - Collapsible */}

        {showFilters && (    return (                setLoading(true);                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">

            <div className="flex flex-wrap gap-4 justify-center items-center">        <div className="mb-6">

                {/* Category Filter */}

                <div className="flex flex-col">            {/* Search Bar */}                const response = await eventsAPI.getAllEvents();

                    <label className="text-sm font-medium text-gray-700 mb-1">Category</label>

                    <select            <div className="relative max-w-md mx-auto mb-4">

                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"

                        value={filters.category}                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />const EventFilters = ({filters, setFilters}) => {disabled = { loading }

                                onChange={e => setFilters({ ...filters, category: e.target.value })}

                        disabled={loading}                    < input

                        >

                            {categories.map(cat => (type = "text"                // Extract unique categories

                                < option key = { cat } value = { cat } > { cat }</option>

                                ))}                placeholder="Search events by name, description, or organizer..."

                    </select>

                </div>                value={filters.search || ''}                const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))];    const [categories, setCategories] = useState(['All']);                />



                {/* Location Filter */}                onChange={e => setFilters({ ...filters, search: e.target.value })}

                <div className="flex flex-col">

                    <label className="text-sm font-medium text-gray-700 mb-1">Location</label>                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"                setCategories(uniqueCategories.filter(Boolean)); // Filter out null/undefined

                    <select

                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]" disabled={loading}

                        value={filters.location}

                        onChange={e => setFilters({ ...filters, location: e.target.value })} />    const [locations, setLocations] = useState(['All']);                {filters.search && (

                            disabled = { loading }

                            > {

                                {locations.map(location => (filters.search && (

                                <option key={location} value={location}>{location}</option>

                            ))}                            <button                // Extract unique locations

                            </select>

            </div>                                onClick={() => setFilters({ ...filters, search: '' })}



                {/* Date Filter */}                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" const uniqueLocations= ['All', ...new Set(response.events.map(event => event.location))];    const [loading, setLoading] = useState(false);                    <button

                        <div className="flex flex-col">

                    <label className="text-sm font-medium text-gray-700 mb-1">Date</label>                                    disabled={loading}

                    <select

                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[140px]"                                >                setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefined

                        value={filters.date}

                        onChange={e => setFilters({ ...filters, date: e.target.value })}                    <X size={20} />

                        disabled={loading}

                            >                </button>            } catch (err) {onClick = {() => setFilters({...filters, search: '' })}

                    {dates.map(date => (

                        <option key={date} value={date}>{date}</option>)}

                                ))}

                </select>            </div>                console.error('Error fetching filter options:', err);

        </div>



        {/* Clear Filters Button */}

        <div className="flex flex-col justify-end">            {/* Filter Dropdowns */}            } finally {    // Fetch unique categories and locations from API                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"

            <button

                onClick={() => setFilters({                < div className = "flex flex-wrap gap-4 justify-center items-center" >

                    category: 'All',

            location: 'All',                    {/* Category Filter */}                setLoading(false);

            date: 'All',

            search: ''                    <select

                                })}

                                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all duration-300 border border-red-200 whitespace-nowrap"                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"            }    useEffect(() => {disabled = { loading }

                                disabled={loading}

                            >                    value={filters.category}

            Clear All

        </button>                    onChange={e => setFilters({ ...filters, category: e.target.value })}        };

    </div>

                    </div > disabled={ loading }



{/* Active Filters Display */ }                >        const fetchFilterOptions = async () => {                    >

    {(filters.category !== 'All' || filters.location !== 'All' || filters.date !== 'All' || filters.search) && (

        <div className="mt-4 pt-4 border-t border-gray-200">                    {

            <div className="text-sm text-gray-600 mb-2">Active filters:</div>                        categories.map(cat => (

            <div className="flex flex-wrap gap-2">

                {filters.search && (<option key={cat} value={cat}>{cat}</option>        fetchFilterOptions();

                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">

                    Search: "{filters.search}"                    ))}

                    <button

                        onClick={() => setFilters({ ...filters, search: '' })}                </select>}, []);            try {<X size={20} />

                                            className="hover:text-blue-900"

                                        >

                <X size={14} />

            </button>                {/* Location Filter */}

        </span>

    )
}            <select

                                {filters.category !== 'All' && (

                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal" return (                setLoading(true);                    </button>

                                        Category: {filters.category}

                                        <button        value={filters.location}

                                            onClick={() => setFilters({ ...filters, category: 'All' })}

                                            className="hover:text-green-900"        onChange={e => setFilters({ ...filters, location: e.target.value })}        <div className="mb-6">

                                        >

                                            <X size={14} />            disabled={loading}

                                        </button>

                                    </span >                > {/* Search Bar */ }                const response = await eventsAPI.getAllEvents();                )}

                                )}

{
    filters.location !== 'All' && ({
        locations.map(location => (

                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">

                                        Location: {filters.location}                        <option key={location} value={location}>{location}</option>            <div className="relative max-w-md mx-auto mb-4">

                                        <button

                                            onClick={() => setFilters({ ...filters, location: 'All' })}                    ))}

                                            className="hover:text-purple-900"

                                        >                </select>                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />            </div>

                                            <X size={14} />

                                        </button >

                                    </span >

                                )
    }        {/* Date Filter */ } <input

        {filters.date !== 'All' && (

            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">                <select

                Date: {filters.date}

                                        <button className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal" type="text"                // Extract unique categories            

                    onClick={() => setFilters({ ...filters, date: 'All' })}

                    className="hover:text-orange-900" value={filters.date}

                >

                    <X size={14} />            onChange={e => setFilters({ ...filters, date: e.target.value })} placeholder="Search events by name, description, or organizer..."

                </button>

            </span>            disabled={loading}

                                )}

                            </div >        > value={ filters.search || '' } const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))]; {/* Filter Dropdowns */ }

                        </div >

                    )}            {
    dates.map(date => (

                </div >

            )
} <option key={date} value={date}>{date}</option>                    onChange = { e => setFilters({ ...filters, search: e.target.value })}

        </div >

    );                    ))}

};

        </select > className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"                setCategories(uniqueCategories.filter(Boolean)); // Filter out null/undefined            <div className="flex flex-wrap gap-4 justify-center items-center">

export default EventFilters;
        </div >

    </div > disabled={ loading }

    );

}; />                {/ * Category Filter */}



export default EventFilters; {
    filters.search && (

        <button                // Extract unique locations                <selectreact';

            onClick={() => setFilters({ ...filters, search: '' })}

            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" const uniqueLocations= ['All', ...new Set(response.events.map(event => event.location))]; import { Search, X } from 'lucide-react';

    disabled = { loading }

        > setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefinedimport {eventsAPI} from '../services/api';

    <X size={20} />

</button >            } catch (err) {

                )
}

            </div > console.error('Error fetching filter options:', err); const dates = [



    {/* Filter Dropdowns */ }            } finally {
        'All',

            <div className="flex flex-wrap gap-4 justify-center items-center">

                {/* Category Filter */}                setLoading(false);    'Today',

                <select

                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"            }    'This Week',

                value={filters.category}

                onChange={e => setFilters({ ...filters, category: e.target.value })}        };    'This Month',

                disabled={loading}

                >];

                {categories.map(cat => (

                    <option key={cat} value={cat}>{cat}</option>        fetchFilterOptions();

                    ))}

            </select>
    }, []); const EventFilters = ({ filters, setFilters }) => {



        {/* Location Filter */ } const [categories, setCategories] = useState(['All']);

        <select

            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal" return (    const [locations, setLocations] = useState(['All']);

        value = { filters.location }

        onChange = { e => setFilters({ ...filters, location: e.target.value })}        <div className="mb-6">    const [loading, setLoading] = useState(false);

            disabled={loading}

                >            {/* Search Bar */}

            {locations.map(location => (

                        <option key={location} value={location}>{location}</option>            <div className="relative max-w-md mx-auto mb-4">    // Fetch unique categories and locations from API

                    ))}

                </select>                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />    useEffect(() => {



                {/* Date Filter */ } <input const fetchFilterOptions= async () => {

                    <select

                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal" type="text" try {

                    value = { filters.date }

                    onChange={e => setFilters({ ...filters, date: e.target.value })} placeholder="Search events by name, description, or organizer..." setLoading(true);

                    disabled = { loading }

                        > value={ filters.search || '' } const response = await eventsAPI.getAllEvents();

                {
                    dates.map(date => (

                        <option key={date} value={date}>{date}</option>                    onChange = { e => setFilters({...filters, search: e.target.value })}

                    ))}

        </select>                    className = "w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"                // Extract unique categories

            </div >

        </div > disabled= { loading } const uniqueCategories = ['All', ...new Set(response.events.map(event => event.category))];

    );

}; />                setCategories(uniqueCategories.filter(Boolean)); / / Filter out null / undefined



export default EventFilters; {
    filters.search && (

        <button                // Extract unique locations

            onClick={() => setFilters({ ...filters, search: '' })} const uniqueLocations= ['All', ...new Set(response.events.map(event => event.location))];

    className = "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"                setLocations(uniqueLocations.filter(Boolean)); // Filter out null/undefined

    disabled = { loading }
} catch (err) {

                    > console.error('Error fetching filter options:', err);

    <X size={20} />
} finally {

                    </button > setLoading(false);

                )
}            }

            </div >        };



{/* Filter Dropdowns */ } fetchFilterOptions();

<div className="flex flex-wrap gap-4 justify-center items-center">    }, []);

    {/* Category Filter */}

    <select return (

    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"        <div className="flex flex-wrap gap-4 mb-6 justify-center items-center">

        value={filters.category}            {/* Category Filter */}

        onChange={e => setFilters({ ...filters, category: e.target.value })}            <select

            disabled={loading} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"

        >                value={filters.category}

            {categories.map(cat => (onChange = { e => setFilters({...filters, category: e.target.value })}

            <option key={cat} value={cat}>{cat}</option>                disabled={loading}

                    ))}            >

        </select>                {categories.map(cat => (

            <option key={cat} value={cat}>{cat}</option>

                {/* Location Filter */ }))}

        <select            </select>

    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"

    value={filters.location}            {/* Location Filter */}

    onChange={e => setFilters({ ...filters, location: e.target.value })}            <select

        disabled={loading} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"

    >                value={filters.location}

        {locations.map(location => (onChange = { e => setFilters({...filters, location: e.target.value })}

        <option key={location} value={location}>{location}</option>                disabled={loading}

                    ))}            >

    </select>                {locations.map(location => (

        <option key={location} value={location}>{location}</option>

                {/* Date Filter */ }))}

    <select            </select>

className = "px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"

value = { filters.date }            {/* Date Filter */ }

onChange = { e => setFilters({ ...filters, date: e.target.value })}            <select

    disabled={loading} className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bright-teal"

>                value={filters.date}

    {dates.map(date => (onChange = { e => setFilters({...filters, date: e.target.value })}

    <option key={date} value={date}>{date}</option>                disabled={loading}

                    ))}            >

</select>                {
    dates.map(date => (

            </div > <option key={date} value={date}>{date}</option>

        </div >                ))
}

    );            </select >

};        </div >

    );

export default EventFilters;};

export default EventFilters;
