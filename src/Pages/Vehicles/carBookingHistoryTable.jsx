import { useMemo, useState } from "react";
import data from "../../../public/data/data.json"
import Table from "../../Components/table";


const bookings = data.bookings.filter(r => r.car_id === 1);
const customers = data.customers;
// const cars = data.cars;
// const users = data.users;
const drivers = data.drivers;

export const CarBookingHistoryTable = () => {
    const [data, setData] = useState(bookings);
    const [columnFilters, setColumnFilters] = useState([]);
    const [pagination, setPagination] = useState({pageIndex: 0, pageSize: 3})
    console.log(bookings);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const columns = useMemo(() => [
        {
            header: 'ID',
            id: 1,
            accessorKey: 'booking',
            cell: ({row}) => {
                return <div className="bookings-table-bookId">{row.original.booking_id}</div>
            }
        },
        {
            header: 'Customer',
            id: 2,
            accessorKey: 'customer',
            cell: ({row}) => {
                const customer = customers.find(r => row.original.customer_id === r.id)
                return <div className="bookings-table-bookId table-customer">
                    <span className="name">{customer.first_name} {customer.last_name}</span>
                    <span className="phone">{customer.phone_number}</span>
                </div>
            }
        },
        {
            header: 'Start Date',
            id: 4,
            accessorKey: 'start-date',
            cell: ({row}) => {
                const reservation = bookings.find(r => row.original.booking_id === r.booking_id)
                return <div className="bookings-table-bookId table-date">{reservation.start_date}</div>
            }
        },
        {
            header: 'End Date',
            id: 5,
            accessorKey: 'end-date',
            cell: ({row}) => {
                const reservation =bookings.find(r => row.original.booking_id === r.booking_id)
                return <div className="bookings-table-bookId table-date">{reservation.end_date}</div>
            }
        },
        {
            header: 'Driver',
            id: 6,
            accessorKey: 'driver',
            cell: ({row}) => {
                const driver = drivers.find(r => row.original.driver_id === r.id)
                return <div className="bookings-table-bookId">{driver !== undefined  ? `${driver.first_name} ${driver.last_name}` : "none" }</div>
            }
        },
        {
            header: 'Status',
            id: 8,
            accessorKey: 'status',
            cell: ({row}) => {
                const reservation =bookings.find(r => row.original.booking_id === r.booking_id)
                return <div className={`bookings-table-bookId table-status table-status--${reservation.booking_status}`}><p>{reservation.booking_status}</p></div>
            }
        },
    ])

    return (
        <Table
            data={data}
            columnFilters={columnFilters}
            pagination={pagination}
            setData={setData}
            setPagination={setPagination}
            columns={columns}
            setColumnFilters={setColumnFilters}
        />
    )
}