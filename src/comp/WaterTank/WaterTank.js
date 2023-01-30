import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import LiquidFillGauge from "react-liquid-gauge";
import React from "react";

export default function WaterTank({ waterTank }) {
  const startColor = "#6495ed"; // cornflowerblue
  const radius = 100;
  const interpolate = interpolateRgb(startColor, startColor);
  const fillColor = interpolate(waterTank / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  return (
    <div>
      <div className="text-container">
        <text className="title">Water Tank</text>
      </div>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={waterTank}
        percent="%"
        textSize={0}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: "#6495ed",
        }}
        waveStyle={{
          fill: "#6495ed",
        }}
      />
      <div className="text-container">
        <text className="value">{waterTank}%</text>
      </div>
    </div>
  );
}
