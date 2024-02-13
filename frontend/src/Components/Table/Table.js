import React from 'react'

const Table = ({children}) => {
    return (
        <div className="w-full h-fit overflow-y-auto">
            <table className="text-sm text-left w-max"
                   style={{borderCollapse: 'collapse', borderRadius: '12px', 
                   overflow: 'hidden', width: '100%'}}>
                <thead className="text-sm text-white uppercase" style={{borderRadius: '12px', height:'40px', backgroundColor: '#1d2655'}}>
                <tr className='border'>
                    <th scope="col" className="font-bold text-md px-6 py-1">
                        PARTNAME
                    </th>
                    <th scope="col" className="font-bold text-md px-6 py-1">
                        STANDARD
                    </th>
                    <th scope="col" className="font-bold text-md px-6 py-1">
                        ACTUAL
                    </th>
                    <th scope="col" className="font-bold text-md px-6 py-1">
                        ACCURACY
                    </th>
                    <th scope="col" className="font-bold text-md px-6 py-1">
                        STATUS
                    </th>
                </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>
        </div>

    )
}

export default Table
