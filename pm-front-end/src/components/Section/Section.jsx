import {useNavigate} from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import SectionDetails from "src/components/Section/SectionDetails";


export default function Section({title, icon, content, items, onDeleteRow}) {
  const navigate = useNavigate()

  const handleAdd = () => {
    navigate(`/businessmodel/new/${title}`)
  };

  const handleEdit = (item) => {
    navigate(`/businessmodel/new/${title}/${item}/yes`)
  };

  const handleDelete = (item) => {
    onDeleteRow(title, item)
  };

  return (
    <Card sx={{height: '100%'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ width: 40, height: 40 }} aria-label="recipe" src={icon} />
        }
        action={
          <IconButton aria-label="settings" onClick={handleAdd}>
            <AddIcon />
          </IconButton>
        }
        title={title}
        subheader=""
      />

      <CardContent>
        {content &&
         <Typography variant="body2" sx={{color: 'text.secondary'}}>
           {content}
         </Typography>
        }
        <Stack spacing={2}>
        {
          items !== undefined && items !== null && items.map((i, index) => {
            return(
              <SectionDetails key={index} title={i?.name} icon={i?.img} content={i.description} onDeleteRow={handleDelete} onEditRow={handleEdit}/>
            )
          })
        }
        </Stack>

      </CardContent>


    </Card>
  );
}
