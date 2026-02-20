import {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CardMedia from "@mui/material/CardMedia";
import Snackbar from '@mui/material/Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import {useBusinessModel} from "src/hooks/useBusinessModel";
// components
import { useSettingsContext } from 'src/components/settings';
import PageTitle from "src/components/PageTitle/PageTitle";
import CustomTextField from "src/components/Texts/CustomTextField";
import { useImage } from "src/hooks/useImage";
import handShackingIcon from "src/assets/illustrations/ic_handshake.svg";
import yesIcon from "src/assets/illustrations/ic_yes.svg";
import resIcon from "src/assets/illustrations/ic_resource.svg";
import lampIcon from "src/assets/illustrations/ic_lamp.svg";
import annoIcon from "src/assets/illustrations/ic_annotation.svg";
import truckIcon from "src/assets/illustrations/ic_truck.svg";
import groupIcon from "src/assets/illustrations/ic_group.svg";
import structureIcon from "src/assets/illustrations/ic_cost_structure.svg";
import moneyIcon from "src/assets/illustrations/ic_money.svg";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
// ----------------------------------------------------------------------


const VisuallyHiddenInput = styled('input')({
                                              clip: 'rect(0 0 0 0)',
                                              clipPath: 'inset(50%)',
                                              height: 1,
                                              overflow: 'hidden',
                                              position: 'absolute',
                                              bottom: 0,
                                              left: 0,
                                              whiteSpace: 'nowrap',
                                              width: 1,
                                            });

export default function NewBusinessModel() {
  const { title, itemname, toedit } = useParams();
  const { businessModel, businessModelError, businessModelLoading, addKeyPartner, addKeyActivity, addValueProp, checkExists, addKeyResource, addRelationship, addSegment, addChannel, addStructure, addGain } = useBusinessModel();
  const settings = useSettingsContext();
  const mdUp = useResponsive('up', 'md');
  const [name, setName] = useState(itemname === undefined ? '' : itemname);
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('')
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('')
  const [tableData, setTableData] = useState(null)
  const [btnLabel] = useState(itemname === undefined ? `Create ${title}` : `Update ${title}`);
  const [pgLabel] = useState(itemname === undefined ? `New ${title}` : `Update ${title}`);
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState(`${title} has been added.`);
  const {
    convertImageToBinary,
    imgError,
    convertBinary64ToImage,
    binaryData64,
  } = useImage();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      convertImageToBinary(file);
    }
  };

  useEffect(() => {
    //save to db
    if (binaryData64 !== "") {
      const dataBinary = convertBinary64ToImage(binaryData64);
      setImg(dataBinary);
    }
  }, [binaryData64]);

  const handleRemoveLogo = () => {
    setImg('');
  };

  useEffect(() => {
    setTableData(businessModel.details)
    if(toedit === 'yes') {
      let cat = "";
      switch (title){
        case "Key Partner":
          cat = "partner"
          break;
        case "Key Activities":
          cat = "activity"
          break;
        case "Value Propositions":
          cat = "prop"
          break;
        case "Key Resources":
          cat = "resource"
          break;
        case "Customer Relationships":
          cat = "relationship"
          break;
        case "Channels":
          cat = "channels"
          break;
        case "Customer Segments":
          cat = "segment"
          break;
        case "Cost Structure":
          cat = "structures"
          break;
        case "Revenue Streams":
          cat = "gain"
          break;
        default:
          cat = ""
      }
      if (businessModel.details[cat] !== null) {
        const obj = businessModel.details[cat].find(i => i.name === itemname)
        setDescription(obj.description)
        setImg(obj.img)
      }

    }
  }, [businessModel.version])

  const renderIcon = () => {
    switch (title){
      case "Key Partner":
        return {icon: handShackingIcon, text: "Identifies the network of suppliers and partners that help the business succeed."}
      case "Key Activities":
        return {icon: yesIcon, text: "Describes the critical actions a company must take to operate successfully."}
      case "Value Propositions":
        return {icon: lampIcon, text: "Describes the unique value offered to customers, addressing their needs and problems."}
      case "Key Resources":
        return {icon: resIcon, text: "Lists the most important assets required to deliver the value proposition."}
      case "Customer Relationships":
        return {icon: annoIcon, text: "Details the types of relationships a business establishes with its customer segments."}
      case "Channels":
        return {icon: truckIcon, text: "Outlines how a company delivers its value proposition to customers (e.g., sales channels)."}
      case "Customer Segments":
        return {icon: groupIcon, text: "Defines the different groups of people or organizations a business aims to reach and serve."}
      case "Cost Structure":
        return {icon: structureIcon, text: "Outlines the major costs involved in operating the business model."}
      case "Revenue Streams":
        return {icon: moneyIcon, text: "Identifies how the business earns money from each customer segment."}
      default:
        return ""
    }
  };


  const resetFieldsError = () => {
    setNameError(false)

  };

  const resetFieldsTexts = () => {
    setName('')
    setDescription('')
    setImg('')
  };

  const checkData = (cat) => {
    resetFieldsError()
    if(name === '') {
      setNameErrorMsg('*Name is required')
      setNameError(true)
      return false
    }
    if (checkExists(name, cat)) {
      setNameErrorMsg('Item Already Exists')
      setNameError(true)
      return false
    }

    return true
  };

  const addNew = () => {
    if (checkData(title)){
      const data = {
        name,
        description,
        img
      }
      let tmp = []
      switch (title) {
        case "Key Partner":
          if (tableData.partner !== null) {
            tableData.partner.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyPartner(tmp).then( (result) => {
                                     if (result) {
                                       resetFieldsTexts()
                                       setOpenSnake(true)
                                     }

                                   }
          )
          break;

        case "Key Activities":
          if (tableData.activity !== null) {
            tableData.activity.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyActivity(tmp).then( (result) => {
                                      if (result) {
                                        resetFieldsTexts()
                                        setOpenSnake(true)
                                      }

                                    }
          )
          break;

        case "Value Propositions":
          if (tableData.prop !== null) {
            tableData.prop.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addValueProp(tmp).then( (result) => {
                                    if (result) {
                                      resetFieldsTexts()
                                      setOpenSnake(true)
                                    }

                                  }
          )
          break;

        case "Key Resources":
          if (tableData.resource !== null) {
            tableData.resource.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyResource(tmp).then( (result) => {
                                      if (result) {
                                        resetFieldsTexts()
                                        setOpenSnake(true)
                                      }

                                    }
          )
          break;

        case "Customer Relationships":
          if (tableData.relationship !== null) {
            tableData.relationship.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addRelationship(tmp).then( (result) => {
                                       if (result) {
                                         resetFieldsTexts()
                                         setOpenSnake(true)
                                       }

                                     }
          )
          break;

        case "Customer Segments":
          if (tableData.segment !== null) {
            tableData.segment.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addSegment(tmp).then( (result) => {
                                  if (result) {
                                    resetFieldsTexts()
                                    setOpenSnake(true)
                                  }

                                }
          )
          break;

        case "Channels":
          if (tableData.channels !== null) {
            tableData.channels.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addChannel(tmp).then( (result) => {
                                  if (result) {
                                    resetFieldsTexts()
                                    setOpenSnake(true)
                                  }

                                }
          )
          break;

        case "Cost Structure":
          if (tableData.structures !== null) {
            tableData.structures.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addStructure(tmp).then( (result) => {
                                    if (result) {
                                      resetFieldsTexts()
                                      setOpenSnake(true)
                                    }

                                  }
          )
          break;

        case "Revenue Streams":
          if (tableData.gain !== null) {
            tableData.gain.forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addGain(tmp).then( (result) => {
                               if (result) {
                                 resetFieldsTexts()
                                 setOpenSnake(true)
                               }

                             }
          )
          break;

        default:
          return null
      }
    }
  };

  const edit = () => {
      const data = {
        name,
        description,
        img
      }
      let tmp = []
      switch (title) {
        case "Key Partner":
          if (tableData.partner !== null) {
            tableData.partner.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyPartner(tmp).then( (result) => {
                                     if (result) {
                                       resetFieldsTexts()
                                       setOpenSnake(true)
                                     }

                                   }
          )
          break;

        case "Key Activities":
          if (tableData.activity !== null) {
            tableData.activity.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyActivity(tmp).then( (result) => {
                                      if (result) {
                                        resetFieldsTexts()
                                        setOpenSnake(true)
                                      }

                                    }
          )
          break;

        case "Value Propositions":
          if (tableData.prop !== null) {
            tableData.prop.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addValueProp(tmp).then( (result) => {
                                    if (result) {
                                      resetFieldsTexts()
                                      setOpenSnake(true)
                                    }

                                  }
          )
          break;

        case "Key Resources":
          if (tableData.resource !== null) {
            tableData.resource.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addKeyResource(tmp).then( (result) => {
                                      if (result) {
                                        resetFieldsTexts()
                                        setOpenSnake(true)
                                      }

                                    }
          )
          break;

        case "Customer Relationships":
          if (tableData.relationship !== null) {
            tableData.relationship.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addRelationship(tmp).then( (result) => {
                                       if (result) {
                                         resetFieldsTexts()
                                         setOpenSnake(true)
                                       }

                                     }
          )
          break;

        case "Customer Segments":
          if (tableData.segment !== null) {
            tableData.segment.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addSegment(tmp).then( (result) => {
                                  if (result) {
                                    resetFieldsTexts()
                                    setOpenSnake(true)
                                  }

                                }
          )
          break;

        case "Channels":
          if (tableData.channels !== null) {
            tableData.channels.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addChannel(tmp).then( (result) => {
                                  if (result) {
                                    resetFieldsTexts()
                                    setOpenSnake(true)
                                  }

                                }
          )
          break;

        case "Cost Structure":
          if (tableData.structures !== null) {
            tableData.structures.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addStructure(tmp).then( (result) => {
                                    if (result) {
                                      resetFieldsTexts()
                                      setOpenSnake(true)
                                    }

                                  }
          )
          break;

        case "Revenue Streams":
          if (tableData.gain !== null) {
            tableData.gain.filter(i => i.name !== itemname).forEach(i => {
              tmp.push(i)
            })
          }
          tmp.push(data)
          addGain(tmp).then( (result) => {
                               if (result) {
                                 resetFieldsTexts()
                                 setOpenSnake(true)
                               }

                             }
          )
          break;

        default:
          return null
      }
  };

  const handleSubmit = () => {
    if (toedit === undefined) {
      addNew()
    } else {
      edit()
    }
  };

  const renderActions = (
    <>
      <Grid>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {businessModelError !== '' &&
           <Typography variant="body2" sx={{ color: 'red' }}>
             {businessModelError}
           </Typography>
          }

          <LoadingButton variant="contained" size="large" loading={businessModelLoading} onClick={handleSubmit}>
            {btnLabel}
          </LoadingButton>

        </Stack>
      </Grid>
    </>
  );

  const renderDetails = (
    <>
      {mdUp && (
        <>
          <Grid md={4}>
            <Stack spacing={3} sx={{ p: 3 }}>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {renderIcon().text}
              </Typography>

              <CardMedia
                component="img"
                alt="product"
                height="250"
                image={renderIcon().icon}
                sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
              />
            </Stack>
          </Grid>
        </>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}
          <Stack spacing={3} sx={{ p: 3 }}>
              <CustomTextField label="Name" disabled={toedit === undefined ? false : true} value={name} onChange={(v) => setName(v)} error={nameError} helperText={nameErrorMsg}/>
              <CustomTextField label="Description" multiline rows={6} value={description} onChange={(v) => setDescription(v)}/>
          </Stack>
          <Stack spacing={3} sx={{ p: 3 }}>

            <CardMedia
              component="img"
              alt="Logo"
              height="100"
              image={img}
              sx={{ alignSelf: 'center', objectFit: 'contain', width: '100%'}}
            />
            <Stack
              direction="row"
              spacing={2}
              variant="contained"
              aria-label="Basic button group"
              sx={{ alignSelf: 'center' }}
            >
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                color="warning"
              >
                Logo
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </Button>
              <Button color="error" onClick={handleRemoveLogo}>
                Remove
              </Button>
            </Stack>

          </Stack>

          {renderActions}
        </Card>
      </Grid>
    </>
  );




  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PageTitle title={pgLabel} />

      <Grid container spacing={3}>
        {renderDetails}
      </Grid>

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />

    </Container>
  );
}

