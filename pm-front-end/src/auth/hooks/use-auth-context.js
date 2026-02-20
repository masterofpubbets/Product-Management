import { useContext, useState } from "react";
import { AuthContext } from "src/auth/context/jwt/auth-context";
import { hashPassword } from "src/utils/hash-password";
import { HOST_API } from "src/config-global";
import axios from "axios";



const url = HOST_API + "/api/user";
const headers = {
  headers: {
    "allow-google-analytics": "yes",
    "x-auth-token": "",
    "Content-Type": "application/json",
  },
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  if (!context)
    throw new Error("useAuthContext context must be use inside AuthProvider");

  const checkMail = async (mail) => {
    try {
      let payload = await axios.post(
        url + "/checkmail",
        {
          mail: mail,
        },
        headers
      );
      return payload.data;
    } catch (er) {
      setError("Something wrong");
    }
  };

  const register = async (mail, pass, fname, lname, role, pass2) => {
    try {
      setError("");
      setIsLoading(true);
      if (mail === "") {
        setError("Mail is missing!");
        setIsLoading(false);
        return false;
      }
      if (pass === "") {
        setError("Password is missing!");
        setIsLoading(false);
        return false;
      }
      if (fname === "") {
        setError("First name is missing!");
        setIsLoading(false);
        return false;
      }
      if (lname === "") {
        setError("Last name is missing!");
        setIsLoading(false);
        return false;
      }
      if (role === "") {
        setError("Role is missing!");
        setIsLoading(false);
        return false;
      }
      if (pass !== pass2) {
        setError("Passwords is not smatched!");
        setIsLoading(false);
        return false;
      }

      if (pass === pass2) {
        const ckMail = await checkMail(mail);
        if (ckMail.check_mail === "not exists") {
          const hashPass = hashPassword(pass);
          await axios.post(
            url + "/register",
            {
              fname: fname,
              lname: lname,
              mail: mail,
              urole: role,
              pass: hashPass,
            },
            headers
          );
          setIsLoading(false);
          return true;
        } else {
          setError("Mail Exists");
          setIsLoading(false);
          return false;
        }
      } else {
        setError("Password and Confirmed password not matching");
        setIsLoading(false);
        return false;
      }
    } catch (er) {
      setError("Something wrong");
      setIsLoading(false);
      return false;
    }
  };

  const login = async (mail, pass) => {
    try {
      setIsLoading(true);
      setError("");
      if (mail === "") {
        setError("Mail is missing!");
        setIsLoading(false);
        return false;
      }
      if (pass === "") {
        setError("Password is missing!");
        setIsLoading(false);
        return false;
      }
      const hashPass = hashPassword(pass);
      const payload = await axios.post(
        url + "/login",
        {
          mail: mail,
          pass: hashPass,
        },
        headers
      );
      if (payload.data.includes("login-")) {
        //get user info
        const uuid = payload.data.replace("login-", "");
        const userDetails = await getDetails(uuid);
        context.userLogin({details: userDetails, uuid: uuid});
        setIsLoading(false);
        return true;
      } else {
        setError(payload.data);
        setIsLoading(false);
        return false;
      }
    } catch (er) {
      setIsLoading(false);
      setError("Something wrong");
    }
  };

  const getDetails = async (uuid) => {
    try {
      const h = {
        headers: {
          "allow-google-analytics": "yes",
          "x-auth-token": uuid,
          "Content-Type": "application/json",
        },
      };
      let payload = await axios.post(
        url + "/details", {},
        h
      );
      return payload.data;
    } catch (er) {
      setError("Something wrong");
    }
  };



  return { ...context, error, login, register, isLoading };
};
