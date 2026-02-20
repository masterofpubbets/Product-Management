import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { BusinessModelContext } from "src/context/BusinessModelContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/businessmodel";


export const useBusinessModel = () => {
  const { businessModel, loadBusinessModel, clearBusinessModel} = useContext(BusinessModelContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [businessModelError, setBusinessModelError] = useState('');
  const [businessModelLoading, setBusinessModelLoading] = useState(false);
  const [businessModelEmpty, setBusinessModelEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);


  const checkExists = (item, cat) => {
    switch (cat) {
      case "Key Activities":
        if (businessModel.details.activity === null) {
          return false
        }
        if (businessModel.details.activity.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        };
        break;

      case "Key Partner":
        if (businessModel.details.partner === null) {
          return false
        }
        if (businessModel.details.partner.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Key Resources":
        if (businessModel.details.resource === null) {
          return false
        }
        if (businessModel.details.resource.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Value Propositions":
        if (businessModel.details.prop === null) {
          return false
        }
        if (businessModel.details.prop.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Customer Relationships":
        if (businessModel.details.relationship === null) {
          return false
        }
        if (businessModel.details.relationship.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Channels":
        if (businessModel.details.channels === null) {
          return false
        }
        if (businessModel.details.channels.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Customer Segments":
        if (businessModel.details.segment === null) {
          return false
        }
        if (businessModel.details.segment.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Cost Structure":
        if (businessModel.details.structures === null) {
          return false
        }
        if (businessModel.details.structures.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;

      case "Revenue Streams":
        if (businessModel.details.gain === null) {
          return false
        }
        if (businessModel.details.gain.find(i => i.name === item) === undefined) {
          return false
        } else {
          return true
        }
        break;
    }
  };


  const addBusinessModel = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            'mail': mail
          },
        };
        let payload = await axios.post(
          url + '/add',
          {
            proid: selectedProduct.details.id,
            partner: data.partner,
            activity: data.activity,
            prop: data.prop,
            resource: data.resource,
            relationship: data.relationship,
            channels: data.channels,
            segment: data.segment,
            structures: data.structures,
            gain: data.gain,
          },
          h
        );
        if (payload.data === 'done')
          loadBusinessModel(data);
          setBusinessModelLoading(false);
        return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addKeyPartner = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            'mail': mail
          },
        };
        let payload = await axios.post(
          url + '/addkeypartner',
          {
            proid: selectedProduct.details.id,
            partner: data,
          },
          h
        );
        if (payload.data === 'done')
          await getBusinessModel();
          setBusinessModelLoading(false);
        return true

    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addKeyActivity = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addkeyactivity',
        {
          proid: selectedProduct.details.id,
          activity: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addValueProp = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addprop',
        {
          proid: selectedProduct.details.id,
          prop: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addKeyResource = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addresource',
        {
          proid: selectedProduct.details.id,
          resource: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
        setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addRelationship = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addrelationship',
        {
          proid: selectedProduct.details.id,
          relationship: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addSegment = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addsegment',
        {
          proid: selectedProduct.details.id,
          segment: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addChannel = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addchannel',
        {
          proid: selectedProduct.details.id,
          channel: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addStructure = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addstructure',
        {
          proid: selectedProduct.details.id,
          structure: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const addGain = async (data) => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      if(selectedProduct.details === null) {

        setBusinessModelError('You have to select a product first');
        setBusinessModelLoading(false);
        return false
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          'mail': mail
        },
      };
      let payload = await axios.post(
        url + '/addgain',
        {
          proid: selectedProduct.details.id,
          gain: data,
        },
        h
      );
      if (payload.data === 'done')
        await getBusinessModel();
      setBusinessModelLoading(false);
      return true


    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };

  const getBusinessModel = async () => {
    try {
      setBusinessModelError('');
      setBusinessModelLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/get', { proid: proId }, h);
      if (payload.data !== '') {
        loadBusinessModel(payload.data);
      } else {
        clearBusinessModel()
      }
      setBusinessModelLoading(false);
    } catch (er) {
      setBusinessModelError('Error while fetching data');
      setBusinessModelLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
      getBusinessModel().then(

      )
    } else {
      setProId(null)
    }
  }, [selectedProduct.version]);

  useEffect(() => {
    if (user.details !== null) {
      setUserUUID(user.uuid)
      setMail(user.details.mail)
    } else {
      setUserUUID(null)
      setMail(null)
    }
  }, [user.details.version])

  useEffect(() => {
    if (businessModel.details !== null) {
      setBusinessModelEmpty(true)
    } else {
      setBusinessModelEmpty(false)
    }
  }, [businessModel.version])

  return {
    businessModel,
    businessModelError,
    businessModelLoading,
    businessModelEmpty,
    getBusinessModel,
    addBusinessModel,
    addKeyPartner,
    addKeyActivity,
    addValueProp,
    checkExists,
    addKeyResource,
    addRelationship,
    addSegment,
    addChannel,
    addStructure,
    addGain
  };
};
