import React from 'react'

const TableRow = ({partname, actual, predict, status, accuracy}) => {


    return (
        <tr className="text-white" style={{border: '1px solid rgba(128, 128, 128, 0.8)', height:"45px"}}>
            <td className="font-semibold text-sm px-6 py-2 ">
                {partname}
            </td>

            <td className="font-semibold text-sm px-6 py-2">
                {actual}
            </td>
            <td className="font-semibold text-sm px-6 py-2">
                {predict}
            </td>
            <td className="font-semibold text-sm px-6 py-2">
                {accuracy}
            </td>
            <td className={`font-font-semibold text-sm px-6 py-1 `}
               style={{
                color: status === 'OK' ? 'lightgreen' : status === 'WAIT' ? '#d97700' : status === 'UNKNOWN' ? '#ffb917' : 'red',
                important: 'color' // Add this line to include the important declaration
              }}>
                {status ? status : <span style={{color: 'red'}}>NG</span>}
            </td>
        </tr>
    )
}

export default TableRow
