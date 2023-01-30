import axios from "axios";
import SensorData from "../model/sensorData";
//first step like all those apis i save the key and URl
const fireBaseUrl =
  "https://emb-grow-box-default-rtdb.europe-west1.firebasedatabase.app";


const fetchLastData = async () => {
  const { data } = await axios.get(fireBaseUrl + "/sensorsData.json", {
    params: {
      orderBy: '"date"',
      limitToLast: 1,
    },
  });
  //   const key = data.key;
  for (const key in data) {
    const sensorData = new SensorData(data[key]);
    return sensorData;
  }
};

export const updatePeronslDetails = async (peronalDetails) => {
  try {
    const result = await axios.put(
      fireBaseUrl + "/personalDetails.json",
      peronalDetails
    );
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const fetchDataFromLastWeek = async (lastWeekDate) => {
  const { data } = await axios.get(fireBaseUrl + "/sensorsData.json", {
    params: {
      orderBy: '"date"',
      startAt: lastWeekDate,
    },
  });
  const lastWeekData = [];
  for (const key in data) {
    const sensorData = new SensorData(data[key]);
    lastWeekData.push(sensorData);
  }
  return lastWeekData;
};

export default fetchLastData;

export const updateControlSettings = async (controlSettings) => {
  try {
    const response = await axios.put(
      fireBaseUrl + "/controls.json",
      controlSettings
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
