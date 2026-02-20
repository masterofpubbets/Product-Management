import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import SelectCountry from "src/components/Country/SelectCountry";

export default function EditProfileAbout({ show, handlesubmit, aboutIniData }) {
  const [open, setOpen] = useState(show);
  const [country, setCountry] = useState(aboutIniData !== undefined ? aboutIniData.country : '')
  const [about, setAbout] = useState(aboutIniData !== undefined ? aboutIniData.about : '')
  const [company, setCompany] = useState(aboutIniData !== undefined ? aboutIniData.company : '')
  const [school, setSchool] = useState(aboutIniData !== undefined ? aboutIniData.school : '')

  const handleChangeCountry = (e) => {
    setCountry(e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const about = formJson.about;
    const company = formJson.company;
    const school = formJson.school;
    handlesubmit({ about, company, school, country });
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
              required
              margin="dense"
              id="about"
              name="about"
              label="About"
              type="text"
              fullWidth
              variant="standard"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            <Box sx={{marginTop: '20px', marginBottom: '20px', width: '100%'}}>
            <SelectCountry handleChange={handleChangeCountry} iniCountry={country}/>
            </Box>

            <TextField
              autoFocus
              required
              margin="dense"
              id="company"
              name="company"
              label="Company"
              type="text"
              fullWidth
              variant="standard"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="school"
              name="school"
              label="School"
              type="text"
              fullWidth
              variant="standard"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
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
