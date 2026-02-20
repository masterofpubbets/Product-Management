import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { TargetAudContext } from "src/context/TargetAudContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/targetaud";


export const useTargetAud = () => {
  const { targetAud, loadTargetAud, addTargetAud, deleteTargetAud, updateTargetAud} = useContext(TargetAudContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [targetAudError, setTargetAudError] = useState('');
  const [targetAudLoading, setTargetAudLoading] = useState(false);
  const [targetAudEmpty, setTargetAudEmpty] = useState(false);
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
      setTargetAudError('');
      setTargetAudLoading(true);
      if(selectedProduct.details === null) {

        setTargetAudError('You have to select a product first');
        setTargetAudLoading(false);
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
          addTargetAud(data);
          setTargetAudLoading(false);
        return true
      } else {
        setTargetAudError('All data cannot be empty');
        setTargetAudLoading(false);
        return false
      }

    } catch (er) {
      setTargetAudError('Error while fetching data');
      setTargetAudLoading(false);
    }
  };

  const editTargetAud = async (data) => {
    try {
      setTargetAudError('');
      setTargetAudLoading(true);
      if(selectedProduct.details === null) {

        setTargetAudError('You have to select a product first');
        setTargetAudLoading(false);
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
          updateTargetAud(data);
          setTargetAudLoading(false);
        return true



    } catch (er) {
      setTargetAudError('Error while fetching data');
      setTargetAudLoading(false);
    }
  };

  const getTargetAud = async () => {
    try {
      setTargetAudError('');
      setTargetAudLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/get', { proid: proId }, h);
      loadTargetAud(payload.data);
      setTargetAudLoading(false);
    } catch (er) {
      setTargetAudError('Error while fetching data');
      setTargetAudLoading(false);
    }
  };

  const delTargetAud = async (id) => {
    try {
      setTargetAudError('');
      setTargetAudLoading(true);
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
        setTargetAudLoading(false);
      }
    } catch (er) {
      setTargetAudError('Error while fetching data');
      setTargetAudLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
      getTargetAud().then(

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
    if (targetAud.details.length === 0) {
      setTargetAudEmpty(true)
    } else {
      setTargetAudEmpty(false)
    }
  }, [targetAud.version])

  return {
    targetAud,
    targetAudError,
    targetAudLoading,
    targetAudEmpty,
    getTargetAud,
    addNewTargetAud,
    editTargetAud,
    delTargetAud
  };
};
