import axios from "axios";
import React, { useEffect } from "react";
import useApi from "../../Services/api";
import SSEComponent from "../../Services/sse";

import { ImageList,
        Alert,
        QRAlert,
        TopBar, 
        ScrollViewer,
        Table,
        TableRow,
        LoadingInference} from "../../Components";

const url = process.env.REACT_APP_API_URL;

function MainPage() {
  const { cameraList, queue, vehicleInfo, DeleteResults, syncCameraQueue, setVehicleInfo } = useApi();

  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState("Loading");

  const [errorAlert, setErrorAlert] = React.useState(false);
  const [qrAlert, setQrAlert] = React.useState(false);

  const [specData, setSpecData] = React.useState({});
  const [isInferencing, setIsInferencing] = React.useState(false);
  const [isCapturing, setIsCapturing] = React.useState(false);

  // TRY
  async function getSpecificationData() {
    try {
      const resp = await axios.get('http://127.0.0.1:22123/get_spec_front');
      const { data } = await resp;
      
      if (data) {
        setSpecData(data);
      }
    } catch (error) {
      console.error('Server inactive');
    }
  }

  async function getIsInferencing() {
    try {
      const resp = await axios.get('http://127.0.0.1:22123/is_inferencing');
      const { data } = await resp;
      
      if (data) {
        setIsInferencing(data['data']);
      }
    } catch (error) {
      console.error('Server inactive');
    }
  }

  async function getIsCapturing() {
    try {
      const resp = await axios.get('http://127.0.0.1:22123/is_capturing');
      const { data } = await resp;
      
      if (data) {
        setIsCapturing(data['data']);
      }
    } catch (error) {
      console.error('Server inactive');
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
        getSpecificationData();
        getIsInferencing();
        getIsCapturing();
    }, 100)
    return () => clearInterval(interval)
  })
  
  // TRY

  useEffect(() => {
    const interval = setInterval(() => {
      syncCameraQueue(setError);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=> {
    if (error) {
      setErrorAlert(true);
    } else {
      setErrorAlert(false);
    }
  }, [error])

  useEffect(() => {
    let arr_out = []
    if (queue) {
      for (let i = 0; i < queue.length; i++) {
        let arr_in = []
        for (let j = 0; j < cameraList.length; j++) {
          arr_in.push(url+`/image_list/${queue[i]}/${j}`)
        }
        arr_out.push(arr_in)
      }
    }
    setImages(arr_out)
  }, [queue, cameraList]);

  useEffect(() => {
    if (vehicleInfo?.qr) {
      console.log(vehicleInfo)
      setQrAlert(true);
    }
  }, [vehicleInfo?.qr]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setQrAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
}, [qrAlert]);

  return (
    <div 
      className="bg-dark-blue-2 min-h-screen flex flex-col justify-center items-center"
    >
      <TopBar vehicleInfo={vehicleInfo} setQrAlert={setQrAlert} setVehicleInfo={setVehicleInfo}/>
      {
        errorAlert &&
        <Alert message={error}/>
      }
      {
        qrAlert &&
        <QRAlert message={"QR Code Scanned"}/>
      }
      <div className="flex flex-row justify-evenly mt-16 w-full">
        <div className="w-1/2 ml-3">
          <ScrollViewer>
          {
            !(images && images?.length > 0)?
            <p className="w-full text-white text-xl text-center font-bold mt-5">
                No Captured Images
            </p>
            :
            <p className="w-full text-white text-xl text-center font-bold mt-5">
                Captured Images
            </p>
          }
          {
            images && images?.length > 0 && images?.map((imageList, index) => (
              <ImageList index={index} imageList={imageList} DeleteResults={DeleteResults}/>
            )) 
          }
          </ScrollViewer>
        </div>
        {/* TRY */}
        <div className="w-1/2 mr-6 border mx-3">
          <div className="overflow-y-auto w-full h-full">
              <Table>
                  {Object.keys(specData).filter(key => key !== 'N/A').map((key, index) => {
                      return (// eslint-disable-next-line react/jsx-key
                          <TableRow partname={key.replaceAll('_', ' ')} actual={specData[key][0] + ''}
                              predict={specData[key][1] + ''}
                              accuracy={specData[key][3] + ''}
                              status={specData[key][2]} />);
                  })}
              </Table>
              <h1 className='text-sm text-red-500 font-semibold top-3/4 ml-6 mt-5'>PIC COBOT (RED SHIFT) : Amin</h1>
              <h1 className='text-sm text-white font-semibold top-3/4 ml-6'>PIC COBOT (WHITE SHIFT) : Ermanto</h1>
              {/* <h1 className='text-sm text-white font-semibold'>PIC COBOT (WHITE SHIFT) : Ermanto</h1> */}
              {isInferencing && <LoadingInference message="Inferencing..." />}
              {isCapturing && <LoadingInference message="Capturing..." />}
          </div>  
        </div>
        {/* TRY       */}
      </div>
      {!error &&
            <SSEComponent />
          }
    </div>
  );
}

export default MainPage;
