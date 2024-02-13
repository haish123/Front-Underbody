import axios from "axios";
import { useState } from "react";
const url = process.env.REACT_APP_API_URL;
const useApi = () => {
  const [cameraList, setCameraList] = useState([]);
  const [queue, setQueue] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState({});

  const getCameraList = async (errorCallback = null) => {
    try {
      const { data } = await axios.get(`${url}/camera_list`);
      setCameraList(data);
      errorCallback(null);
      return data;
    } catch (err) {
      console.log(err?.response?.data?.detail || err);
      setCameraList([]);
      setQueue(null);
      if (errorCallback) {
        errorCallback(err?.response?.data?.detail || err?.message);
      }
    }
  };

  const syncCameraQueue = async (errorCallback = null) => {
    try {
      const { data } = await axios.get(`${url}/sync_queue`);
      setCameraList(data?.camera_list);
      setQueue(data?.image_uuid);
      setVehicleInfo(data?.vehicle_info);
      errorCallback(null);
      return data;
    } catch (err) {
      console.log(err?.response?.data?.detail || err);
      setCameraList([]);
      setQueue(null);
      if (errorCallback) {
        console.log(err?.message)
        if (err?.message === "Network Error") {
          console.log(err?.response?.data?.detail)
          errorCallback('Loading...');
        } else {
          errorCallback(err?.response?.data?.detail || err?.message);
        }
      }
    }
  }

  const DeleteResults = async (id, errorCallback = null) => {
    try {
      const { data } = await axios.post(`${url}/delete/${id}`);
      errorCallback(null);
    } catch (err) {
      console.log(err?.response?.data?.detail || err);
      if (errorCallback) {
        errorCallback(err?.response?.data?.detail || err?.message);
      }
    }
  }

  return { cameraList, queue, getCameraList, DeleteResults, syncCameraQueue, vehicleInfo };
};

export default useApi;
