import React from "react";

function LiveVideo({ cameraList }) {
    if (cameraList && cameraList.length > 0) {
        return (
            <div className="bg-dark-blue rounded-lg border-2 border-white">
                <p className="text-white text-xl text-center font-bold">
                    Live Video
                </p>
                <div className="grid grid-cols-2 text-white">
                {cameraList?.map((camera, index) => (
                    <div index={index} className="flex flex-col">
                        <img
                            className="w-64 h-48 m-1 rounded-lg"
                            src={`http://localhost:5000/live_feed/${camera}`}
                            alt="camera"
                        />
                    </div>
                ))}
                </div>
            </div>
        );
    }
}

export default LiveVideo;
