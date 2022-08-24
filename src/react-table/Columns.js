import {format} from 'date-fns';
import {ColumnFiltering} from './ColumnFiltering'
export const Columns=[
    {
        Header:'user_id',
        accessor:'user_id',
        Filter:ColumnFiltering
    },
    {
        Header:'user_name',
        accessor:'user_name',
        Filter:ColumnFiltering
    },
    {
        Header:'date_of_birth',
        accessor:'date_of_birth',
        Cell:({ value })=>{return format(new Date(value),'dd/MM/yyyy')},
        Filter:ColumnFiltering
    },
    {
        Header:'email_id',
        accessor:'email_id',
        Filter:ColumnFiltering
    },
    {
        Header:'mobile_number',
        accessor:'mobile_number',
        Filter:ColumnFiltering
    },
    {
        Header:'country_name',
        accessor:'country_name',
        Filter:ColumnFiltering
    },  
]