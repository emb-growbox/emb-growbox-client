import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Form.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { updatePeronslDetails } from "../../util/http";

export default function Form() {
  const [peronalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    telegramId: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const handleChange = (name, event) => {
    setPersonalDetails((prevState, props) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  async function onClickHandler() {
    setLoading(true);
    const result = await updatePeronslDetails(peronalDetails);
    if (!result) {
      setSeverity("error");
      setMessage("Failed to save changes");
    } else {
      setSeverity("success");
      setMessage("Successfully saved changes");
    }
    setOpenToast(true);
    setLoading(false);
    setPersonalDetails({ firstName: "", lastName: "", telegramId: "" });
  }
  let buttonContent = (
    <view className="form-button">
      <Button onClick={onClickHandler} variant="contained">
        Apply Changes
      </Button>
    </view>
  );
  if (loading) {
    buttonContent = (
      <view className="form-button">
        <CircularProgress />
      </view>
    );
  }
  return (
    <div className="form-container">
      <Box
        className="form-box"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="First Name"
          required
          value={peronalDetails.firstName}
          onChange={handleChange.bind(this, "firstName")}
          variant="standard"
        />
        <TextField
          id="outlined-last-name"
          label="Last Name"
          variant="standard"
          required
          value={peronalDetails.lastName}
          onChange={handleChange.bind(this, "lastName")}
        />
        <TextField
          id="outlined-phone"
          label="Telegram User Id"
          helperText={
            <a
              href="https://bigone.zendesk.com/hc/en-us/articles/360008014894-How-to-get-the-Telegram-user-ID-"
              target="_blank"
            >
              How to get telegram user id?
            </a>
          }
          variant="standard"
          required
          value={peronalDetails.telegramId}
          onChange={handleChange.bind(this, "telegramId")}
        />
        {buttonContent}
      </Box>
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
