import { Input } from '@mui/material'
import React from 'react'

export const GlobalSearch = ({ filter, setFilter}) => {
    return (
        <span>
            Search: {' '}
            <Input  value={filter || ''}
            onChange={e => setFilter(e.target.value)} />
        </span>
    )
}
