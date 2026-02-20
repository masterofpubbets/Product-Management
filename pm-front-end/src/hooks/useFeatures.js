import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { FeatureContext } from "src/context/FeatureContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/feature";


export const useFeatures = () => {
  const { features, loadFeature, deleteFeature, updateFeature, addFeature, clearFeatureIni } = useContext(FeatureContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [featureError, setFeatureError] = useState('');
  const [featureLoading, setFeatureLoading] = useState(false);
  const [featureEmpty, setFeatureEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);


  const checkNewFeature = (feature) => {
    let chk = true;
    setFeatureError('');
    if (feature.name === '') {
      setFeatureError('Name is required!')
      chk = false;
    }
    return chk;

  };

  const checkFeatureExists = async (name) => {
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
      setFeatureError('Feature Exists!')
      setFeatureLoading(false)
      return true;
    }
  };

  const checkFeatureExists2 = async (ftId, name) => {
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
        id: ftId,
        proid: selectedProduct.details.id,
        name: name,
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setFeatureError('Feature Exists!')
      setFeatureLoading(false)
      return true;
    }
  };

  const addNewFeature = async (feature) => {
    try {
      setFeatureError('');
      setFeatureLoading(true);
      if(selectedProduct.details === null) {

        setFeatureError('You have to select a product first');
        setFeatureLoading(false);
        return false
      }
      if (checkNewFeature(feature) === true) {
        if (await checkFeatureExists(feature.name) === false) {
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
              name: feature.name,
              timeToUse: feature.timeToUse,
              numOfUse: feature.numberOfUser,
              kano: feature.kano,
              des: feature.des,
              discontinue: feature.discontinue,
              current: feature.current,
              mosco: feature.mosco,
              iniId: feature.iniId
            },
            h
          );
          if (payload.data === 'done')
            addFeature(feature);
            setFeatureLoading(false);
          return true
        } else {
          return false
        }
      }

    } catch (er) {
      setFeatureError('Error while fetching data');
      setFeatureLoading(false);
    }
  };

  const editFeature = async (feature) => {
    try {
      setFeatureError('');
      setFeatureLoading(true);
      if(selectedProduct.details === null) {

        setFeatureError('You have to select a product first');
        setFeatureLoading(false);
        return false
      }
      if (checkNewFeature(feature) === true) {
        if (await checkFeatureExists2(feature.id, feature.name) === false) {
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
              id: feature.id,
              name: feature.name,
              timeToUse: feature.timeToUse,
              numOfUse: feature.numberOfUser,
              kano: feature.kano,
              des: feature.des,
              discontinue: feature.discontinue,
              current: feature.current,
              mosco: feature.mosco,
              iniId: feature.iniId
            },
            h
          );
          if (payload.data === 'done')
            updateFeature(feature);
            setFeatureLoading(false);
          return true
        }
      }

    } catch (er) {
      setFeatureError('Error while fetching data');
      setFeatureLoading(false);
    }
  };

  const getFeatures = async () => {
    try {
      setFeatureError('');
      setFeatureLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getfeatures', { id: proId }, h);
      loadFeature(payload.data);
      setFeatureLoading(false);
    } catch (er) {
      setFeatureError('Error while fetching data');
      setFeatureLoading(false);
    }
  };

  const deleteFt = async (id) => {
    try {
      setFeatureError('');
      setFeatureLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/delete', { id }, h);
      if (payload.data === 'done') {
        deleteFeature(id)
        setFeatureLoading(false);
      }
    } catch (er) {
      setFeatureError('Error while fetching data');
      setFeatureLoading(false);
    }
  };

  const clearIni = async (id) => {
    try {
      setFeatureError('');
      setFeatureLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          mail: mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/clearini', { id }, h);
      if (payload.data === 'done') {
        clearFeatureIni(id);
        setFeatureLoading(false);
      }
    } catch (er) {
      setFeatureError('Error while fetching data');
      setFeatureLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
      getFeatures().then(

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
    if (features.details.length === 0) {
      setFeatureEmpty(true)
    } else {
      setFeatureEmpty(false)
    }
  }, [features.version])

  return {
    features,
    featureError,
    featureLoading,
    featureEmpty,
    getFeatures,
    addNewFeature,
    editFeature,
    deleteFt,
    clearIni,
  };
};
