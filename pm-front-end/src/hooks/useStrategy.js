import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import {StrategyContext} from "src/context/StrategyContext";
import { useProduct } from "src/hooks/useProducts";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/strategy";


export const useStrategy = () => {
  const { strategy, loadStrategy} = useContext(StrategyContext);
  const {user} = useUsers();
  const {selectedProduct} = useProduct();
  const [strategyError, setStrategyError] = useState('');
  const [strategyLoading, setStrategyLoading] = useState(false);
  const [StrategyEmpty, setStrategyEmpty] = useState(false);
  const [proId, setProId] = useState(selectedProduct.details !== null ? selectedProduct.details.id : null);
  const [userUUID, setUserUUID] = useState(user.uuid);
  const [mail, setMail] = useState(user.details.mail);



  const getStrategy = async () => {
    try {
      setStrategyError('');
      setStrategyLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getstrategy', { id: proId }, h);
      loadStrategy(payload.data);
      setStrategyLoading(false);
    } catch (er) {
      setStrategyError('Error while fetching data');
      setStrategyLoading(false);
    }
  };

  const addStrategy = async (level, strategy) => {
    try {
      setStrategyError('');
      setStrategyLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'no',
          'x-auth-token': userUUID,
          'mail': mail,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/addstrategy',
                                     {
                                       id: proId,
                                       level,
                                       strategy
                                     }, h);
      if (payload.data === 'done') {
        setStrategyLoading(false);
        await getStrategy()
        return true
      } else {
        setStrategyLoading(false);
        return false
      }

    } catch (er) {
      setStrategyError('Error while fetching data');
      setStrategyLoading(false);
      return false
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
    if (strategy.details.length === 0) {
      setStrategyEmpty(true)
    } else {
      setStrategyEmpty(false)
    }
  }, [strategy.version])

  return {
    strategy,
    strategyError,
    strategyLoading,
    StrategyEmpty,
    getStrategy,
    addStrategy
  };
};
