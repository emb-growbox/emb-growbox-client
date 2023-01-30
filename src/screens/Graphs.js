import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Graph from "../comp/Graph/Graph";
import { fetchDataFromLastWeek } from "../util/http";
import LinearProgress from "@mui/material/LinearProgress";

const relevantDates = [
  getDateBeforeXDays(6),
  getDateBeforeXDays(5),
  getDateBeforeXDays(4),
  getDateBeforeXDays(3),
  getDateBeforeXDays(2),
  getDateBeforeXDays(1),
  getDateBeforeXDays(0),
];

const labels = relevantDates.map((x) => x.toLocaleDateString("en-GB"));

function getDateBeforeXDays(day) {
  const now = new Date();

  let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function getSensorDataDividedByWeek(data) {
  const dataByWeek = Object.assign(
    {},
    ...relevantDates.map((x) => ({
      [x]: data.filter((sensorData) => {
        return areEqualsDates(x, sensorData.date);
      }),
    }))
  );

  const dataByWeekAverge = {};
  for (const item of relevantDates) {
    dataByWeekAverge[item] = {
      temperature:
        dataByWeek[item].length>0
          ? getAverge(dataByWeek[item].map((x) => x.temperature))
          : 0,
      soilMoisture:
        dataByWeek[item].length>0
          ? getAverge(dataByWeek[item].map((x) => x.soilMoisture))
          : 0,
    };
  }
  const dataByWeekValues = [];
  for (const key in dataByWeekAverge) {
    if (!dataByWeekAverge[key]) {
      dataByWeekValues.push({ soilMoisture: 0, temperature: 0 });
    } else {
      dataByWeekValues.push(dataByWeekAverge[key]);
    }
  }
  console.log(dataByWeek);
  return dataByWeekValues;
}

function getAverge(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function areEqualsDates(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDay() === date2.getDay()
  );
}

export default function Graphs() {
  const [sensorData, setSensorData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromLastWeek(
        getDateBeforeXDays(6).getTime() / 1000
      );
      const dataDividedByWeek = getSensorDataDividedByWeek(data);
      setSensorData(dataDividedByWeek);
    }
    fetchData();
  }, []);

  if (sensorData.length === 0) {
    return <LinearProgress />;
  }
  return (
    <div className="data-row">
      <view className="data-item">
        <Graph
          labels={labels}
          label={"Soil Moisture"}
          graphData={sensorData.map((x) => x.soilMoisture)}
          title="Soil Moisture Data From Last Week"
          color={"green"}
          scaleY={{ min: 0, max: 100 }}
        />
      </view>
      <view className="data-item">
        <Graph
          labels={labels}
          label={"Temperature"}
          graphData={sensorData.map((x) => x.temperature)}
          title="Temperature Data From Last Week"
          color={"rgb(255, 99, 132)"}
          scaleY={{ min: 0, max: 50 }}
        />
      </view>
    </div>
  );
}
