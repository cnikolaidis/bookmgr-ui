import { useState, useEffect } from 'react';

const SelectableTable = ({ data, columns, selected, onSelectionChange }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const toggleSelectAll = () => {
        if (selectedIds.length === data.length) {
            setSelectedIds([]);
        } else {
            const allIds = data.map(item => item.id);
            setSelectedIds(allIds);
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        if (selected !== undefined) {
            setSelectedIds(selected);
        }
    }, [selected]);
    
    useEffect(() => {
        onSelectionChange?.(selectedIds);
    }, [selectedIds, onSelectionChange]);

    return (
        <table style={{ border: '1px solid black', margin: '10px auto', width: '60vw', textAlign: 'center' }}>
            <thead style={{ borderBottom: '1px solid black' }}>
                <tr>
                    <th>
                        <input
                            type="checkbox"
                            checked={selectedIds.length === data.length}
                            onChange={toggleSelectAll}/>
                    </th>
                    {columns.map(col => (<th key={col.key}>{col.label}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.map(row => (
                    <tr key={row.id ?? row.isbn}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(row.id ?? row.isbn)}
                                onChange={() => toggleSelectOne(row.id ?? row.isbn)}/>
                        </td>
                        {columns.map(col => (<td key={col.key}>{row[col.key]}</td>))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SelectableTable;