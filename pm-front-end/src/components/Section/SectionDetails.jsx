import {useState} from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import Button from "@mui/material/Button";
import Iconify from 'src/components/iconify';
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";

export default function SectionDetails({title, icon, content, onDeleteRow, onEditRow}) {
  const confirm = useBoolean();
  const popover = usePopover();
  const [open, setOpen] = useState(false);


  const handleDelete = () => {
    setOpen(false)
    onDeleteRow(title)
  };


  return (
    <>
      <Card>
        <CardHeader
          action={
            <IconButton color={popover.open ? 'primary' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          }
          title={""}
          subheader={title}
        />

        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="caption">Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {content}
            </AccordionDetails>
          </Accordion>
        </CardContent>

        <CardMedia
          component="img"
          alt="product"
          height="70"
          image={icon}
          sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%', marginBottom: '15px'}}
        />


      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow(title);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            setOpen(true);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

      </CustomPopover>


        <ConfirmDialog
          open={open}
          onClose={() => setOpen(false)}
          title="Delete"
          content="Are you sure want to delete?"
          action={
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          }
        />

      </>
  );
}
