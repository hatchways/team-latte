import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Input } from "@material-ui/core";

export default function MessageDialog() {
  const [open, setOpen] = useState(false);
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClickClose() {
    setOpen(false);
  }
  function submitChanges() {
    handleClickClose();
  }

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="outlined">
        Send Message
      </Button>

      <Dialog open={open} onClose={handleClickClose} fullWidth>
        <DialogTitle>Message</DialogTitle>

        <DialogContent>
          <DialogContentText>
            <TextField type="text" label="Message" multiline fullWidth />
          </DialogContentText>
        </DialogContent>

        <Button onClick={submitChanges}>Submit Changes</Button>
      </Dialog>
    </React.Fragment>
  );
}
