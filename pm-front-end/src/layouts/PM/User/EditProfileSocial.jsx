import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";


export default function EditProfileSocial({ show, handlesubmit, socialsIniData }) {
    const [open, setOpen] = useState(show);
    const [facebook, setFacebook] = useState(socialsIniData !== undefined ? socialsIniData.socialLinks.facebook : '')
    const [instagram, setInstagram] = useState(socialsIniData !== undefined ? socialsIniData.socialLinks.instagram : '')
    const [linkedin, setLinkedin] = useState(socialsIniData !== undefined ? socialsIniData.socialLinks.linkedin : '')
    const [x, setX] = useState(socialsIniData !== undefined ? socialsIniData.socialLinks.x : '')

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const facebook = formJson.facebook;
    const instagram = formJson.instagram;
    const linkedin = formJson.linkedin;
    const x = formJson.x;
    handlesubmit({ facebook, instagram, linkedin, x });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    handlesubmit();
  };

  useEffect(() => {
    if (show) {
      setOpen(show);
    }
  }, [show]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit About</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              margin="dense"
              id="facebook"
              name="facebook"
              label="Facebook"
              type="text"
              fullWidth
              variant="standard"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />

            <TextField
              autoFocus
              margin="dense"
              id="instagram"
              name="instagram"
              label="Instagram"
              type="text"
              fullWidth
              variant="standard"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="linkedin"
              name="linkedin"
              label="Linkedin"
              type="text"
              fullWidth
              variant="standard"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="x"
              name="x"
              label="X"
              type="text"
              fullWidth
              variant="standard"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
