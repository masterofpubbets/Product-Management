import { useContext, useState, useEffect } from "react";
import { HOST_API } from "src/config-global";
import { ProductContext } from "src/context/ProductContext";
import { useUsers } from "src/hooks/useUsers";
import axios from 'axios';

const url = HOST_API + "/api/product";
const urlUser = HOST_API + "/api/user";

export const useProduct = () => {
  const {user} = useUsers();
  const { products, users, selectedProduct, loadProducts, deleteProducts, loadUsers, selectProduct, reset } = useContext(ProductContext);
  const [productError, setProductError] = useState('');
  const [productUserError, setProductUserError] = useState('');
  const [productLoading, setProductLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [productsEmpty, setProductsEmpty] = useState(false);
  const [userId, setUserId] = useState(null);
  const [uuid, setUserUUID] = useState(null);
  const [currentUserMail, setCurrentUserMail] = useState(null);


  const checkNewProduct = (product) => {
    let chk = true;
    setProductError('');
    if (product.name === '') {
      setProductError('Name is required!')
      setProductLoading(false)
      chk = false;
    }
    if (product.des === '') {
      setProductError('Description is required!')
      setProductLoading(false)
      chk = false;
    }
    if (product.type === '') {
      setProductError('Type is required!')
      setProductLoading(false)
      chk = false;
    }
    if (product.role === '') {
      setProductError('Role is required!')
      setProductLoading(false)
      chk = false;
    }
    return chk;

  };

  const checkProductExists = async (name) => {
    const h = {
      headers: {
        'allow-google-analytics': 'yes',
        'x-auth-token': uuid,
        'Content-Type': 'application/json',
      },
    };
    let payload = await axios.post(
      url + '/checkproductexists',
      {
        uid: userId,
        name: name,
      },
      h
    );
    if (payload.data === 'not exists') {
      return false;
    } else {
      setProductError('Product Exists!')
      setProductLoading(false)
      return true;
    }
  };

  const addNewProduct = async (product) => {
    try {
      setProductError('');
      setProductLoading(true);
      if (checkNewProduct(product) === true) {
        if (await checkProductExists(uuid, product.uid, product.name) === false) {
          const h = {
            headers: {
              'allow-google-analytics': 'yes',
              'x-auth-token': uuid,
              'Content-Type': 'application/json',
            },
          };
          let payload = await axios.post(
            url + '/add',
            {
              uid: product.uid,
              name: product.name,
              des: product.des,
              type: product.type,
              logo: product.logo,
              role: product.role,
              default: product.default,
            },
            h
          );
          if (payload.data === 'done')
            loadProducts(product);
          setProductLoading(false);
        }
      }

    } catch (er) {
      setProductError('Error while fetching data');
      setProductLoading(false);
    }
  };

  const getProduct = async () => {
    try {
      setProductError('');
      setProductLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'yes',
          'x-auth-token': user.uuid,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getproducts', { uid: user.details.id }, h);
      loadProducts(payload.data);
      setProductLoading(false);
    } catch (er) {
      setProductError('Error while fetching data');
      setProductLoading(false);
    }
  };

  const unloadProduct = () => {
    loadProducts([]);
  };
  const unloadProductUsers = () => {
    loadUsers([]);
  };

  const deleteProduct = async (proId) => {
    try {
      setProductError('');
      setProductLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'yes',
          'x-auth-token': uuid,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/delete', { uid: proId }, h);
      if (payload.data === 'ok') {
        deleteProducts(proId);
      }
      setProductLoading(false);
    } catch (er) {
      setProductError('Error while fetching data');
      setProductLoading(false);
    }
  };

  const updateProductBasic = async (product) => {
    try {
      setProductError('');
      setProductLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'yes',
          'x-auth-token': uuid,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/editbasic', {
        id: product.id,
        name: product.name,
        type: product.type,
        des: product.des,
        default: product.default
      }, h);
      if (payload.data === 'ok') {
        getProduct().then(

        )
      }

    } catch (er) {
      setProductError('Error while fetching data');
      setProductLoading(false);
    }
  };

  const updateProductLogo = async (product) => {
    try {
      setProductError('');
      setProductLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'yes',
          'x-auth-token': uuid,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/editlogo', {
        id: product.id,
        logo: product.logo,
      }, h);
      if (payload.data === 'ok') {
        getProduct().then(

        )
      }

    } catch (er) {
      setProductError('Error while fetching data');
      setProductLoading(false);
    }
  };

  const getProductUsers = async (proId) => {
    try {
      setProductUserError('');
      setUserLoading(true);
      const h = {
        headers: {
          'allow-google-analytics': 'yes',
          'x-auth-token': uuid,
          'Content-Type': 'application/json',
        },
      };
      let payload = await axios.post(url + '/getproductusers', {
        proId: proId
      }, h);
      loadUsers(payload.data)
      setUserLoading(false);
    } catch (er) {
      setProductUserError('Error while fetching data');
      setUserLoading(false);
    }
  };

  const checkOtherMailExists = async (userId, mail) => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        urlUser + "/checkothermail", {id: userId, mail},
        h
      );
      if (payload.data.check_other_mail_exists === 'exists') {
        return true;
      } else {
        return false;
      }
    } catch (er) {
      return true
    }
  };

  const addUserProduct = async (proId, mail, role) => {
    try {
      setProductUserError('');
      setUserLoading(true);
      if(!await checkOtherMailExists(userId, mail)) {
        setProductUserError('Mail not exists!');
        setUserLoading(false);
        return false
      }
      if(mail === '') {
        setProductUserError('Mail is required');
        setUserLoading(false);
        return false
      }
      if(mail === currentUserMail) {
        setProductUserError('You cannot assign yourself!');
        setUserLoading(false);
        return false
      }
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/adduserproduct", {proId, mail, role},
        h
      );
      setUserLoading(false);
      if (payload.data === 'done') {
        getProductUsers(proId).then(() => {

        })
        return true;
      } else {
        return false;
      }
    } catch (er) {
      setProductUserError('Error while fetching data');
      setUserLoading(false);
      return false
    }
  };

  const removeUser = async (id, proId) => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/removeuserproduct", {uId: id},
        h
      );
      if (payload.data === 'done') {
        await getProductUsers(proId)
        return true;
      } else {
        return false;
      }
    } catch (er) {
      return true
    }
  };

  const changeUserRole = async (id, role, proId) => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/roleuserproduct", {id, role},
        h
      );
      if (payload.data === 'done') {
        await getProductUsers(proId)
        return true;
      } else {
        return false;
      }
    } catch (er) {
      return true
    }
  };

  const getDefaultProduct = async () => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/getdefaultproduct", {userId},
        h
      );
      if (payload.data !== null) {
        await selectProduct(payload.data)
        return true;
      } else {
        return false;
      }
    } catch (er) {
      return true
    }
  };


  useEffect(() => {
    if (products.details.length === 0) {
        setProductsEmpty(true)
    } else {
        setProductsEmpty(false)
    }
  }, [products.version]);

  useEffect(() => {
    if (user.details !== null) {
      setUserId(user.details.id)
      setUserUUID(user.uuid)
      setCurrentUserMail(user.details.mail)
    } else {
      setUserId(null)
      setUserUUID(null)
      setCurrentUserMail(null)
    }
  }, [user.version])

  return {
    products,
    users,
    selectedProduct,
    productError,
    productUserError,
    productLoading,
    userLoading,
    productsEmpty,
    addNewProduct,
    getProduct,
    unloadProduct,
    deleteProduct,
    updateProductBasic,
    updateProductLogo,
    getProductUsers,
    addUserProduct,
    unloadProductUsers,
    removeUser,
    changeUserRole,
    selectProduct,
    getDefaultProduct,
    reset
  };
};
