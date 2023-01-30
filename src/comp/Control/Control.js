import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import "./Control.css";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { CircularProgress, FormControlLabel } from "@mui/material";
import { MdOutlineLightMode } from "react-icons/md";
import { GiWaterTank } from "react-icons/gi";
import { updateControlSettings } from "../../util/http";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 100,
    label: "100%",
  },
];

export default function Control({ lightPower }) {
  const [sliderValue, setSliderValue] = useState(lightPower);
  const [switchValue, setSwitchValue] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const [irrigationDisabled, setIrrigationDisabled] = useState(false);
  let switchTimeout = null;
  function sliderValueText(value) {
    return `${value}%`;
  }

  const handleSliderChange = (event, newValue) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
    }
  };

  const handleSwitchChange = (event) => {
    setSwitchValue(event.target.checked);
  };

  const irrigationTimeoutHandler = () => {
    setIrrigationDisabled(false);
    setSwitchValue(false);
    setOpenToast(true);
    setMessage("Finished watering the plant");
    setSeverity("info");
    clearTimeout(switchTimeout);
  };

  async function onClickHandler() {
    setLoading(true);
    const data = {
      lightPower: sliderValue,
      irrigation: switchValue ? 1 : 0,
      updateDate: Math.round(new Date().getTime() / 1000),
    };
    const result = await updateControlSettings(data);
    if (!result) {
      setSeverity("error");
      setMessage("Failed to save changes");
    } else {
      setSeverity("success");
      setMessage("Successfully saved changes");
    }
    if (switchValue) {
      switchTimeout = setTimeout(irrigationTimeoutHandler, 4000);
      setIrrigationDisabled(true);
    }
    setOpenToast(true);
    setLoading(false);
  }

  let buttonContent = (
    <view className="control-button">
      <Button onClick={onClickHandler} disabled={irrigationDisabled} variant="contained">
        Apply Changes
      </Button>
    </view>
  );
  if (loading) {
    buttonContent = (
      <view className="control-button">
        <CircularProgress />
      </view>
    );
  }
  const switchLabel = switchValue ? "ON" : "AUTOMATIC";
  return (
    <>
      <div className="control-container">
        <view className="control-item">
          <div className="control-text-container">
            <text className="control-title">Lights</text>
          </div>
          <view className="control-slider-container">
            <MdOutlineLightMode size={"2em"} />
            <Slider
              className="control-slider"
              aria-label="Default"
              valueLabelDisplay="auto"
              valueLabelFormat={sliderValueText}
              min={0}
              max={100}
              getAriaValueText={sliderValueText}
              marks={marks}
              onChangeCommitted={handleSliderChange}
              value={sliderValue}
              disabled={loading }
            />
          </view>
        </view>
        <view className="control-item">
          <div className="control-text-container">
            <text className="control-title">Irrigation</text>
          </div>
          <view className="control-switch-container">
            <GiWaterTank size={"2em"} />
            <view className="control-switch">
              <FormControlLabel
                control={
                  <Switch
                    onChange={handleSwitchChange}
                    checked={switchValue}
                    size="medium"
                    disabled={loading}
                  />
                }
                label={switchLabel}
              />
            </view>
          </view>
        </view>
      </div>
      {buttonContent}

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
