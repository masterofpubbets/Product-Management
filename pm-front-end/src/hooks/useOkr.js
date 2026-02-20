import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import {OkrContext} from "src/context/OkrContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/okr";
const url2 = HOST_API + "/api/feature";


export const useOkr= () => {
  const {
    objectives,
    keyResults,
    initiatives,
    features,
    summary,
    keyStatus,
    loadObjectives,
    loadKeyResults,
    loadInitiatives,
    loadFeatures,
    clearFeatureIni,
    deleteFeature,
    loadSummary,
    loadKeyStatus,
    delKeyStatus,
    updateKeyStatus,
    addObj,
  } = useContext(OkrContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [okrError, setOkrError] = useState('');
  const [okrLoading, setOkrLoading] = useState(false);
  const [objectivesEmpty, setObjectivesEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);


  const checkDataNotEmpty = (data) => {
    let isNotEmpty = false;

    if(data.role !== '') {isNotEmpty = true}
    if(data.education !== '') {isNotEmpty = true}
    if(data.location !== '') {isNotEmpty = true}
    if(data.problem !== '') {isNotEmpty = true}
    if(data.interests !== '') {isNotEmpty = true}
    if(data.bahavioral !== '') {isNotEmpty = true}
    if(data.life_style !== '') {isNotEmpty = true}
    if(data.goal !== '') {isNotEmpty = true}

    return isNotEmpty;

  };

  const addNewTargetAud = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if(selectedProduct.details === null) {

        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false
      }

      if (checkDataNotEmpty(data) === true) {
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
            role: data.role,
            age: data.age,
            education: data.education,
            location: data.location,
            problem: data.problem,
            gender: data.gender,
            interests: data.interests,
            bahavioral: data.bahavioral,
            life_style: data.life_style,
            goal: data.goal,
          },
          h
        );
        if (payload.data === 'done')
          //addTargetAud(data);
        setOkrLoading(false);
        return true
      } else {
        setOkrError('All data cannot be empty');
        setOkrLoading(false);
        return false
      }

    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const editTargetAud = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if(selectedProduct.details === null) {

        setOkrError('You have to select a product first');
        setOkrLoading(false);
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
        url + '/edit',
        {
          id: data.id,
          role: data.role,
          age: data.age,
          education: data.education,
          location: data.location,
          problem: data.problem,
          gender: data.gender,
          interests: data.interests,
          bahavioral: data.bahavioral,
          life_style: data.life_style,
          goal: data.goal,
        },
        h
      );
      if (payload.data === 'done')
        //updateTargetAud(data);
      setOkrLoading(false);
      return true



    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getInitiatives = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getiniatives', { proid: proId }, h);
      loadInitiatives(payload.data);
      await getFeatures()
      await getSummary()
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getKeyResults = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getkeyresults', { proid: proId }, h);
      loadKeyResults(payload.data);
      if(payload.data.length > 0){
        await getInitiatives()
      }
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getObjectives = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getobjectives', { proid: proId }, h);
      loadObjectives(payload.data);
      if(payload.data.length > 0){
        await getKeyResults()
      }
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };


  const delTargetAud = async (id) => {
    try {
      setOkrError('');
      setOkrLoading(true);
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
        deleteTargetAud(id)
        setOkrLoading(false);
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getFeatures = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url2 + '/getfeatures', { id: proId }, h);
      loadFeatures(payload.data);
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getFeaturesData = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url2 + '/getfeatures', { id: proId }, h);
      setOkrLoading(false);
      return(payload.data);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const clearIni = async (id) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          mail: mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url2 + '/clearini', { id }, h);
      if (payload.data === 'done') {
        clearFeatureIni(id);
        setOkrLoading(false);
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const deleteFt = async (id) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          mail: mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url2 + '/delete', { id }, h);
      if (payload.data === 'done') {
        deleteFeature(id);
        setOkrLoading(false);
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getSummary = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          mail: mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getsummary', { proid: proId }, h);
      loadSummary(payload.data);
      await getFeatures();
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const getKeyStatus = async () => {
    try {
      setOkrError('');
      setOkrLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          mail: mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getstatus', { proid: proId }, h);
      loadKeyStatus(payload.data);
      await getFeatures();
      setOkrLoading(false);
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const statusExists = async (name) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkstatusexists',
        {
          proid: proId,
          name: name,
        },
        h
      );
      return payload.data === 'exists';
    } catch(error) {
      return true
    }

  };

  const statusExists2 = async (id, name) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkstatusexists2',
        {
          keyid: id,
          name: name,
        },
        h
      );
      return payload.data === 'exists';
    } catch (error) {
      return true;
    }
  };

  const statusExists3 = async (id) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkstatusexists3',
        {
          keyid: id
        },
        h
      );
      return payload.data === 'exists';
    } catch (error) {
      return true;
    }
  };

  const addStatus = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if(await statusExists(data.name) === true) {
        setOkrError('Status exists');
        setOkrLoading(false);
        return false;
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/addstatus',
        {
          proid: proId,
          name: data.name,
          pointx: data.point,
          order: data.order,
        },
        h
      );
      if (payload.data === 'done') {
        await getFeatures();
      }
        setOkrLoading(false);
      return true;
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const editStatus = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if ((await statusExists2(data.id, data.name)) === true) {
        setOkrError('Status exists');
        setOkrLoading(false);
        return false;
      }

      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/editstatus',
        {
          id: data.id,
          name: data.name,
          pointx: data.point,
          order: data.order,
        },
        h
      );
      if (payload.data === 'done') {
        updateKeyStatus(data);
      }
      setOkrLoading(false);
      return true;
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const delStatus = async (id) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if (await statusExists3(id) === true) {
        setOkrError('Status cannot be deleted as long as it assigned to Key Result');
        setOkrLoading(false);
        return false;
      } else {
        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            mail: mail,
          },
        };
        let payload = await axios.post(
          url + '/delstatus',
          {
            id,
          },
          h
        );
        if (payload.data === 'done') {
          delKeyStatus(id);
        }
        setOkrLoading(false);
        return true;
      }

    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const objExists = async (name) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkobjexists',
        {
          proid: proId,
          name,
        },
        h
      );
      return payload.data === 'exists';
    } catch (error) {
      return true;
    }
  };

  const objExists2 = async (data) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkobjexists2',
        {
          proid: proId,
          id: data.id,
          name: data.name,
        },
        h
      );
      return payload.data === 'exists';
    } catch (error) {
      return true;
    }
  };

  const addNewObj = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if ((await objExists(data.name)) === true) {
        setOkrError('Objective already exists');
        setOkrLoading(false);
        return false;
      } else {
        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            mail: mail,
          },
        };
        let payload = await axios.post(
          url + '/addobjective',
          {
            proid: proId,
            name: data.name,
            group: data.group,
            order: data.order,
          },
          h
        );
        if (payload.data === 'done') {
          await getObjectives();
        }
        setOkrLoading(false);
        return true;
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const editObj = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if ((await objExists2(data)) === true) {
        setOkrError('Objective already exists');
        setOkrLoading(false);
        return false;
      } else {
        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            mail: mail,
          },
        };
        let payload = await axios.post(
          url + '/editobjective',
          {
            id: data.id,
            name: data.name,
            group: data.group,
            order: data.order,
          },
          h
        );
        if (payload.data === 'done') {
          await getObjectives();
        }
        setOkrLoading(false);
        return true;
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const delObj = async (id) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/delobj',
        {
          id,
        },
        h
      );
      if (payload.data === 'done') {
        await getObjectives();
      }
      setOkrLoading(false);
      return true;
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };

  const keyResultExists = async (data) => {
    try {
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
          mail: mail,
        },
      };
      let payload = await axios.post(
        url + '/checkkeyresults',
        {
          proid: proId,
          name: data.name,
        },
        h
      );
      return payload.data === 'exists';
    } catch (error) {
      return true;
    }
  };

  const addNewKeyResult = async (data) => {
    try {
      setOkrError('');
      setOkrLoading(true);
      if (selectedProduct.details === null) {
        setOkrError('You have to select a product first');
        setOkrLoading(false);
        return false;
      }
      if ((await keyResultExists(data)) === true) {
        setOkrError('Key Result already exists');
        setOkrLoading(false);
        return false;
      } else {
        const h = {
          headers: {
            'allow-google-analytics': 'no',
            'x-auth-token': user.uuid,
            'Content-Type': 'application/json',
            mail: mail,
          },
        };
        let payload = await axios.post(
          url + '/addkeyresult',
          {
            proid: proId,
            objId: data.objId,
            name: data.name,
            weight: data.weight,
            kpi: data.kpi,
          },
          h
        );
        if (payload.data === 'done') {
          await getObjectives();
        }
        setOkrLoading(false);
        return true;
      }
    } catch (er) {
      setOkrError('Error while fetching data');
      setOkrLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
      getObjectives().then(

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
    if (objectives.details.length === 0) {
      setObjectivesEmpty(true)
    } else {
      setObjectivesEmpty(false)
    }
  }, [objectives.version])

  return {
    objectives,
    keyResults,
    initiatives,
    features,
    summary,
    keyStatus,
    okrError,
    okrLoading,
    objectivesEmpty,
    getObjectives,
    getFeatures,
    getKeyResults,
    addNewTargetAud,
    editTargetAud,
    delTargetAud,
    getFeaturesData,
    clearIni,
    deleteFt,
    getSummary,
    getKeyStatus,
    addStatus,
    delStatus,
    editStatus,
    addNewObj,
    delObj,
    editObj,
    addNewKeyResult,
  };
};
