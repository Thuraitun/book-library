import useTheme from "../hooks/useTheme";

const Login = () => {

  const { isDark } = useTheme();


  return (
    <div className="h-screen">
    <div className="text-center my-4">
      <h1 className="text-[22px] text-primary font-bold">Login</h1>
    </div>
    <form className="w-full max-w-lg mx-auto">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
            Email
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter your email" />
        </div>

        <div className="w-full px-3">
        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
            Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="********" />
        </div>

        <div className="w-full px-3">
          <button className="text-white bg-primary px-3 py-2 rounded-xl flex justify-center items-center gap-1 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="">Login</span>
          </button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default Login;
