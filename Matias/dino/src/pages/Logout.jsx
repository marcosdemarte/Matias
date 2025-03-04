import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate(process.env.PUBLIC_URL + "/", { replace: true });
  };
  /*
  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);
*/
  return (
    <>
      <button onClick={() => handleLogout()} className="">
        <div className="text-base flex flex-row">
          <div>Cerrar sesión</div>
          <div className="mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" instagram dark:fill-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </div>
        </div>
      </button>
    </>
  );
};

export default Logout;
