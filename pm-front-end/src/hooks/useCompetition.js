import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { CompetitionContext } from "src/context/CompetitionContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/competition";


export const useCompetition = () => {
  const { competition, loadCompetition, deleteCompetition, updateCompetition, addCompetition} = useContext(CompetitionContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [competitionError, setCompetitionError] = useState('');
  const [competitionLoading, setCompetitionLoading] = useState(false);
  const [competitionEmpty, setCompetitionEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);


  const checkCompExists = async (company, details) => {
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
        company,
        details,
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setCompetitionError('Competition Exists!')
      setCompetitionLoading(false)
      return true;
    }
  };

  const checkCompExists2 = async (maId, company, details) => {
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
        proid: selectedProduct.details.id,
        id: maId,
        company,
        details
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setCompetitionError('Competition Exists!')
      setCompetitionLoading(false)
      return true;
    }
  };

  const addNewComp = async (comp) => {
    try {
      setCompetitionError('');
      setCompetitionLoading(true);
      if(selectedProduct.details === null) {

        setCompetitionError('You have to select a product first');
        setCompetitionLoading(false);
        return false
      }

        if (await checkCompExists(comp.com, comp.det) === false) {
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
              company: comp.com,
              detailsType: comp.detailsType,
              details: comp.det,
            },
            h
          );
          if (payload.data === 'done')
            addCompetition(comp);
            setCompetitionLoading(false);
          return true
        } else {
          return false
        }

    } catch (er) {
      setCompetitionError('Error while fetching data');
      setCompetitionLoading(false);
    }
  };

  const editComp = async (comp) => {
    try {
      setCompetitionError('');
      setCompetitionLoading(true);
      if(selectedProduct.details === null) {

        setCompetitionError('You have to select a product first');
        setCompetitionLoading(false);
        return false
      }

        if (await checkCompExists2(comp.id, comp.com, comp.det) === false) {
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
              id: comp.id,
              company: comp.com,
              details: comp.det,
              detailsType: comp.detailsType,
            },
            h
          );
          if (payload.data === 'done')
            updateCompetition(comp);
            setCompetitionLoading(false);
          return true
        }


    } catch (er) {
      setCompetitionError('Error while fetching data');
      setCompetitionLoading(false);
    }
  };

  const getComp = async () => {
    try {
      setCompetitionError('');
      setCompetitionLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/get', { proid:proId }, h);
      loadCompetition(payload.data);
      setCompetitionLoading(false);
    } catch (er) {
      setCompetitionError('Error while fetching data');
      setCompetitionLoading(false);
    }
  };

  const deleteComp = async (id) => {
    try {
      setCompetitionError('');
      setCompetitionLoading(true);
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
        deleteCompetition(id)
        setCompetitionLoading(false);
      }
    } catch (er) {
      setCompetitionError('Error while fetching data');
      setCompetitionLoading(false);
    }
  };


  useEffect(() => {
    if(selectedProduct.details !== null) {
      setProId(selectedProduct.details.id)
      getComp().then(

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
    if (competition.details.length === 0) {
      setCompetitionEmpty(true)
    } else {
      setCompetitionEmpty(false)
    }
  }, [competition.version])

  return {
    competition,
    competitionError,
    competitionLoading,
    competitionEmpty,
    getComp,
    addNewComp,
    editComp,
    deleteComp
  };
};
