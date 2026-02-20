import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { StakeholderContext } from "src/context/stakeholderContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/stakeholder";


export const useStakeholders = () => {
  const { stakeholders, loadStakeholders, deleteStakeholder, UpdateStakeholders} = useContext(StakeholderContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [stakeholderError, setStakeholderError] = useState('');
  const [stakeholderLoading, setStakeholderLoading] = useState(false);
  const [stakeholderEmpty, setStakeholderEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);


  const checkNewStakeholder = (product) => {
    let chk = true;
    setStakeholderError('');
    if (product.name === '') {
      setStakeholderError('Name is required!')
      chk = false;
    }
    if (product.des === '') {
      setStakeholderError('Description is required!')
      chk = false;
    }
    if (product.type === '') {
      setStakeholderError('Type is required!')
      chk = false;
    }
    if (product.role === '') {
      setStakeholderError('Role is required!')
      chk = false;
    }
    return chk;

  };

  const checkStakeholderExists = async (name) => {
    const h = {
      headers: {
        'allow-google-analytics': 'no',
        'x-auth-token': user.uuid,
        'mail': mail,
        'Content-Type': 'application/json',
      },
    };
    let payload = await axios.post(
      url + '/checkexists',
      {
        proid: selectedProduct.details.id,
        name: name,
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setStakeholderError('Stakeholder Exists!')
      setStakeholderLoading(false)
      return true;
    }
  };

  const checkStakeholderExists2 = async (stId, name) => {
    const h = {
      headers: {
        'allow-google-analytics': 'no',
        'x-auth-token': user.uuid,
        'mail': mail,
        'Content-Type': 'application/json',
      },
    };
    let payload = await axios.post(
      url + '/checkexists2',
      {
        stid: stId,
        proid: selectedProduct.details.id,
        name: name,
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setStakeholderError('Stakeholder Exists!')
      setStakeholderLoading(false)
      return true;
    }
  };

  const addNewStakeholder = async (stakeholder) => {
    try {
      setStakeholderError('');
      setStakeholderLoading(true);
      if(selectedProduct.details === null) {

        setStakeholderError('You have to select a product first');
        setStakeholderLoading(false);
        return false
      }
      if (checkNewStakeholder(stakeholder) === true) {
        if (await checkStakeholderExists(stakeholder.name) === false) {
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
              name: stakeholder.name,
              organization: stakeholder.organization,
              role: stakeholder.role,
              contact: stakeholder.contact,
              des: stakeholder.des,
              category: stakeholder.category,
              country: stakeholder.country,
              lang: stakeholder.lang,
            },
            h
          );
          if (payload.data === 'done')
            loadStakeholders(stakeholder);
            setStakeholderLoading(false);
            return true
        }
      }

    } catch (er) {
      setStakeholderError('Error while fetching data');
      setStakeholderLoading(false);
    }
  };

  const editStakeholder = async (stakeholder) => {
    try {
      setStakeholderError('');
      setStakeholderLoading(true);
      if(selectedProduct.details === null) {

        setStakeholderError('You have to select a product first');
        setStakeholderLoading(false);
        return false
      }
      if (checkNewStakeholder(stakeholder) === true) {
        if (await checkStakeholderExists2(stakeholder.id, stakeholder.name) === false) {
          const h = {
            headers: {
              'allow-google-analytics': 'no',
              'x-auth-token': user.uuid,
              'Content-Type': 'application/json',
              'mail': mail
            },
          };
          let payload = await axios.post(
            url + '/edit',
            {
              stid: stakeholder.id,
              proid: selectedProduct.details.id,
              name: stakeholder.name,
              organization: stakeholder.organization,
              role: stakeholder.role,
              contact: stakeholder.contact,
              des: stakeholder.des,
              category: stakeholder.category,
              country: stakeholder.country,
              lang: stakeholder.lang,
            },
            h
          );
          if (payload.data === 'done')
            UpdateStakeholders(stakeholder);
          setStakeholderLoading(false);
          return true
        }
      }

    } catch (er) {
      setStakeholderError('Error while fetching data');
      setStakeholderLoading(false);
    }
  };

  const getStakeholders = async () => {
    try {
      setStakeholderError('');
      setStakeholderLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getstakeholder', { id: proId }, h);
      loadStakeholders(payload.data);
      setStakeholderLoading(false);
    } catch (er) {
      setStakeholderError('Error while fetching data');
      setStakeholderLoading(false);
    }
  };

  const deleteSt = async (id) => {
    try {
      setStakeholderError('');
      setStakeholderLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/delete', { id }, h);
      if (payload.data === 'ok') {
        deleteStakeholder(id)
        setStakeholderLoading(false);
      }
    } catch (er) {
      setStakeholderError('Error while fetching data');
      setStakeholderLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
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
    if (stakeholders.details.length === 0) {
      setStakeholderEmpty(true)
    } else {
      setStakeholderEmpty(false)
    }
  }, [stakeholders.version])

  return {
    stakeholders,
    stakeholderError,
    stakeholderLoading,
    stakeholderEmpty,
    getStakeholders,
    addNewStakeholder,
    editStakeholder,
    deleteSt
  };
};
