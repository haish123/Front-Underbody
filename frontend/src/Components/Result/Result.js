import React from "react";

function Result({ results }) {
    <div className="flex flex-col">
        {results?.map((result) => (
            <div>
            {console.log(result)}
            <p>batas</p>
            {Object.keys(result).map((partname) =>
                <p>{partname}</p>
            )}
            </div>
        ))}
    </div>
}

export default Result;