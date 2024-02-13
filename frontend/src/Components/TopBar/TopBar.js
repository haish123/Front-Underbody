import React from "react";
import {StopButton} from "../../Components";

const InfoContainer = ({Title, Value}) => {
    return (
        <div className=" flex flex-col justify-center mx-5">
            <p className="text-light-blue-2 font-bold">
                {Title}
            </p>
            <p>
                {Value}
            </p>
        </div>
    )
}


const QRContainer = ({Title, Value, vehicleInfo, setVehicleInfo}) => {
    const handleOnChange = (e) => {
        setVehicleInfo({
            ...vehicleInfo,
            "qr": e.target.value
        })
    }

    return (
        <div className=" flex flex-col justify-center mx-5">
            <p className="text-light-blue-2 font-bold">
                {Title}
            </p>
            <input value={Value} className="bg-light-blue rounded-md px-2 py-1" onChange={handleOnChange} />
        </div>
    )
}

function TopBar({vehicleInfo, setVehicleInfo}) {
    return (
        <div className="flex flex-row bg-dark-blue text-white h-20 w-full fixed top-0 justify-between items-center py-14">
            <div className="flex flex-row items-center">
                <img 
                    className="w-32 h-auto m-5" 
                    src="image/LOGO.png" 
                    alt="toyota-logo"
                />
                <div>
                    <p className="text-white font-bold text-xl">
                        PT TOYOTA MOTOR MANUFACTURING INDONESIA
                    </p>
                    <p className="text-white text-l">
                        PLANT #2 QUALITY CONTROL AI UNDERBODY FRONT INSPECTION
                    </p>
                </div>
            </div>
            <div className="flex flex-1 flex-row-reverse item-center">
                <StopButton className='mr-10'/>
                <div className="flex flex-row items-center bg-light-blue px-3 mx-10 rounded-full h-16">
                    <p className="font-bold">
                        Last Scanned Vehicle
                    </p>
                    <div className="w-1 h-12 bg-white mx-5"></div>
                    <QRContainer Title="QR Code" Value={vehicleInfo?.qr} vehicleInfo={vehicleInfo} setVehicleInfo={setVehicleInfo}/>
                    <InfoContainer Title="Frame No" Value={vehicleInfo?.frame_no} />
                    <InfoContainer Title="Variant" Value={vehicleInfo?.variant} />
                    <InfoContainer Title="Suffix" Value={vehicleInfo?.suffix_no} />
                </div>
            </div>
        </div>
    );
}

export default TopBar;