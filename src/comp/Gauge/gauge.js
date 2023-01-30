import GaugeChart from "react-gauge-chart";
import "./Gauge.css";

export default function Gauge({
  title,
  precent,
  value,
  nrOfLevels,
  colors,
  arcsLength,
}) {
  return (
    <view className="gauge-container">
      <div className="text-container">
        <text className="title">{title}</text>
      </div>
      <GaugeChart
        nrOfLevels={nrOfLevels}
        percent={precent}
        textColor={"black"}
        className="chart"
        hideText={true}
        colors={colors}
        arcsLength={arcsLength}
      />
      <div className="text-container">
        <p className="value">{value}</p>
      </div>
    </view>
  );
}
