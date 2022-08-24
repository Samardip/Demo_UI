import { Input } from '@mui/material'
import React from 'react'

export const ColumnFiltering = ({ column}) => {
    const {filterValue, setFilter} = column;
    return (
        <span>
            <Input  value={filterValue || ''}
            onChange={e => setFilter(e.target.value)} />
        </span>
    )
}
