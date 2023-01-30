import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent, Slider } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

export default function SimpleDialog(props) {
  const { light,onClose,open } = props;
  let value = 0;

  const handleClose = () => {
    onClose(value);
  };
  function valuetext(value_) {
    value = value_;
  }

  const StSlider = styled(Slider)({
    color: '#FFB81C',
});

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogContent>
            <Box sx={{ width: 300 }}>
                <StSlider
                key={light}
                defaultValue={light}
                min={0}
                max={100}
                getAriaValueText={valuetext}/>
            </Box>
        </DialogContent>
    </Dialog>
  );
}
