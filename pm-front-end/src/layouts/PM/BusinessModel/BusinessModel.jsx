import { useState, useEffect } from "react";
// @mui
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
//
import { paths } from 'src/routes/paths';
// components
import { useSettingsContext } from "src/components/settings";
import Section from 'src/components/Section/Section';
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import styles from './canvas.module.css';
import handShackingIcon from "src/assets/illustrations/ic_handshake.svg";
import yesIcon from "src/assets/illustrations/ic_yes.svg";
import resIcon from "src/assets/illustrations/ic_resource.svg";
import lampIcon from "src/assets/illustrations/ic_lamp.svg";
import annoIcon from "src/assets/illustrations/ic_annotation.svg";
import truckIcon from "src/assets/illustrations/ic_truck.svg";
import groupIcon from "src/assets/illustrations/ic_group.svg";
import structureIcon from "src/assets/illustrations/ic_cost_structure.svg";
import moneyIcon from "src/assets/illustrations/ic_money.svg";
// Hooks
import {useBusinessModel} from "src/hooks/useBusinessModel";
// ----------------------------------------------------------------------



export default function BusinessModel() {
  const settings = useSettingsContext();
  const [tableData, setTableData] = useState(null);
  const {businessModel, getBusinessModel, businessModelLoading, addKeyPartner, addKeyActivity, addValueProp, checkExists, addKeyResource, addRelationship, addSegment, addChannel, addStructure, addGain} = useBusinessModel();
  const [openSnake, setOpenSnake] = useState(false);
  const [snakeMessage, setSnakeMessage] = useState('');


  useEffect(() => {
    if (businessModel.details !== null) {

      setTableData(businessModel.details);

    }
  }, [businessModel.version]);

  useEffect(() => {
    getBusinessModel().then(() => {
                        }
    )
  }, [])

  const deleteItem = (cat, itemName) => {
    let tmp = []
    switch (cat) {
      case "Key Partner":
        if (tableData.partner !== null) {
          tableData.partner.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addKeyPartner(tmp).then( (result) => {
                                   if (result) {
                                     setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                     setOpenSnake(true)
                                   }

                                 }
        )
        break;

      case "Key Activities":
        if (tableData.activity !== null) {
          tableData.activity.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addKeyActivity(tmp).then( (result) => {
                                    if (result) {
                                      setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                      setOpenSnake(true)
                                    }

                                  }
        )
        break;

      case "Value Propositions":
        if (tableData.prop !== null) {
          tableData.prop.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addValueProp(tmp).then( (result) => {
                                  if (result) {
                                    setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                    setOpenSnake(true)
                                  }

                                }
        )
        break;

      case "Key Resources":
        if (tableData.resource !== null) {
          tableData.resource.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addKeyResource(tmp).then( (result) => {
                                    if (result) {
                                      setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                      setOpenSnake(true)
                                    }

                                  }
        )
        break;

      case "Customer Relationships":
        if (tableData.relationship !== null) {
          tableData.relationship.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addRelationship(tmp).then( (result) => {
                                     if (result) {
                                       setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                       setOpenSnake(true)
                                     }

                                   }
        )
        break;

      case "Customer Segments":
        if (tableData.segment !== null) {
          tableData.segment.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addSegment(tmp).then( (result) => {
                                if (result) {
                                  setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                  setOpenSnake(true)
                                }

                              }
        )
        break;

      case "Channels":
        if (tableData.channels !== null) {
          tableData.channels.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addChannel(tmp).then( (result) => {
                                if (result) {
                                  setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                  setOpenSnake(true)
                                }

                              }
        )
        break;

      case "Cost Structure":
        if (tableData.structures !== null) {
          tableData.structures.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addStructure(tmp).then( (result) => {
                                  if (result) {
                                    setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                                    setOpenSnake(true)
                                  }

                                }
        )
        break;

      case "Revenue Streams":
        if (tableData.gain !== null) {
          tableData.gain.filter(i => i.name !== itemName).forEach(i => {
            tmp.push(i)
          })
        }
        addGain(tmp).then( (result) => {
                             if (result) {
                               setSnakeMessage(`${itemName} has been deleted from ${cat}`)
                               setOpenSnake(true)
                             }

                           }
        )
        break;

      default:
        return null
    }
  };

  const handleDelete = (title, item) => {
    deleteItem(title, item)
  };


  const renderSkeleton = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    )
  }


  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Business Model Canvas"
          links={[{ name: 'List', href: paths.feature.root }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {!businessModelLoading &&

          <div className={styles.canvas}>

            <div className={styles.partner}>
              <Section title={'Key Partner'} icon={handShackingIcon} items={businessModel.details?.partner} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.activity}>
              <Section title={'Key Activities'} icon={yesIcon} items={businessModel.details?.activity} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.res}>
              <Section title={'Key Resources'} icon={resIcon} items={businessModel.details?.resource} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.prop}>
              <Section title={'Value Propositions'} icon={lampIcon} items={businessModel.details?.prop} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.relation}>
              <Section title={'Customer Relationships'} icon={annoIcon} items={businessModel.details?.relationship} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.channel}>
              <Section title={'Channels'} icon={truckIcon} items={businessModel.details?.channels} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.segment}>
              <Section title={'Customer Segments'} icon={groupIcon} items={businessModel.details?.segment} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.cost}>
              <Section title={'Cost Structure'} icon={structureIcon} items={businessModel.details?.structures} onDeleteRow={handleDelete}/>
            </div>

            <div className={styles.rev}>
              <Section title={'Revenue Streams'} icon={moneyIcon} items={businessModel.details?.gain} onDeleteRow={handleDelete}/>
            </div>

          </div>
        }

        {businessModelLoading && renderSkeleton()}

      </Container>

      <Snackbar
        open={openSnake}
        autoHideDuration={2000}
        onClose={() => setOpenSnake(false)}
        message={snakeMessage}
      />

    </>
  );
}

