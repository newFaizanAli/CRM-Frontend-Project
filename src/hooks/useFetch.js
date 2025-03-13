import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData, fireToast } from '../utilities/functions';
import { UserRoleContext } from '../context';

export const useFetch = () => {
  const navigate = useNavigate();
  const { logout, login, setLoginUser } = useContext(UserRoleContext);

  const handleFetch = useCallback(
    async (method, url, body, form) => {
      try {
        const result = await fetchData(method, url, body, form);
        

        if (result.message) {
          fireToast(result.message, result.success);
        }

        if(result.loginUser){
          setLoginUser(result.loginUser)
        }

        if (result.login && result.login === true) {
          login();
          navigate("/");
        }


        if (result.token === false) {
          logout();
          navigate("/");
          // return;
        }

        // if (result.message) {
        //   toastDisplay(result.message);
        // }

        return result;
      } catch (e) {
        console.error('Error during fetch:', e.message);
        fireToast("An error occurred. Please try again.", false);
      }
    },
    [logout, navigate, login, setLoginUser],
  );

  return { handleFetch };
};
