import { useContext, useState } from "react";
import { HOST_API } from "src/config-global";
import axios from "axios";
import { hashPassword } from "src/utils/hash-password";
import { AuthContext } from "src/auth/context/jwt/auth-context";


const url = HOST_API + "/api/user";

export const useUsers = () => {
  const {user, updateAbout, updateSocials, updateBasic, updateLogo, removeLogo, updateSkills} = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const addAbout = async (uuid, id, about) => {
    try {
      setError('');
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/addabout", {id, about},
        h
      );
      if (payload.data === 'done') {
        updateAbout(about);
      }
      return payload.data;
    } catch (er) {
      setError("Something wrong");
    }
  };

  const addSocials = async (uuid, id, socials) => {
    try {
      setError('');
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/addsocial", {id, socials},
        h
      );
      if (payload.data === 'done') {
        updateSocials(socials);
      }
      return payload.data;
    } catch (er) {
      setError("Something wrong");
    }
  };

  const checkOtherMailExists = async (uuid, id, mail) => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/checkothermail", {id, mail},
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

  const addBasicInfo = async (uuid, id, data) => {
    try {
      setError('');
      if (data.mail === '') {
        setError('Missing Mail')
        return false
      };
      if (data.fname === '') {
        setError('Missing First Name')
        return false
      };
      if (data.lname === '') {
        setError('Missing Last Name')
        return false
      };
      if (data.role === '') {
        setError('Missing Role')
        return false
      }
      if (checkOtherMailExists(uuid, id, data.mail) === true) {
        setError('This mail exists for another user')
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
        url + "/savebasicinfo", {id, mail: data.mail, fname: data.fname, lname: data.lname, role: data.role},
        h
      );
      if (payload.data === 'done') {
        updateBasic(data);
        return true
      }
      return payload.data;
    } catch (er) {
      setError("Something wrong");
    }
  };

  const addLogo = async (uuid, id, logo) => {
    try {
      setError('');
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/updateuserlogo", {id, logo},
        h
      );
      if (payload.data === 'done') {
        updateLogo(logo);
      }
    } catch (er) {
      setError("Something wrong");
    }
  };

  const deleteLogo = async (uuid, id) => {
    try {
      setError('');
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/removeuserlogo", {id},
        h
      );
      if (payload.data === 'done') {
        removeLogo();
      }
    } catch (er) {
      setError("Something wrong");
    }
  };

  const addSkills = async (uuid, id, skills) => {
    try {
      setError('')
      if(skills === undefined) {
        setError('No Skill to add!')
        return false;
      }
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/updateskills", {id, skills},
        h
      );
      if (payload.data === 'done') {
        updateSkills(skills);
        return true
      }
    } catch (er) {
      setError("Something wrong");
      return false
    }
  };

  const setPassword = async (uuid, id, pass, pass2) => {
    try {
      setError('')
      if (pass === "") {
        setError("Password is missing!");
        setIsLoading(false);
        return false;
      }
      if (pass !== pass2) {
        setError("Passwords is not smatched!");
        setIsLoading(false);
        return false;
      }

      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      const hashPass = hashPassword(pass);
      let payload = await axios.post(
        url + "/setpass", {id, hashPass},
        h
      );
      if (payload.data === 'done') {
        return true
      }
    } catch (er) {
      setError("Something wrong");
      return false
    }
  };

  return {
    user,
    error,
    isLoading,
    addAbout,
    addSocials,
    addBasicInfo,
    addLogo,
    deleteLogo,
    addSkills,
    setPassword
  };
};
