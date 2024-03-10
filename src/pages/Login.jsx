import { useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import { useState } from "react";
import useSignin from "../hooks/useSignin";

const Login = () => {

  const { isDark } = useTheme();

  const [ email, setEmail ] = useState(''); 
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate()

  const { error, loading, signIn } = useSignin(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let user = await signIn(email, password)

      if(!user.error) {
        navigate('/')    
      }
    } catch(e) {
      console.log(e.message);
    }
  }


  return (
    <div className="h-screen">
    <div className="text-center my-4">
      <h1 className="text-[22px] text-primary font-bold">Login</h1>
    </div>
    <form className="w-full max-w-lg mx-auto" onSubmit={handleLogin}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
            Email
          </label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"   type="text" placeholder="Enter your email" />
        </div>

        <div className="w-full px-3">
        <label className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${isDark ? 'text-gray-100' : ''}`}>
            Password
          </label>
          <input value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="password" placeholder="********" />
        </div>

        <div className="w-full px-3">
          {error && <span className="text-red-500 italic">{error}</span>}
        </div>

        <div className="w-full px-3">
          <button className="text-white bg-primary px-3 py-2 rounded-xl flex justify-center items-center gap-1 w-full">
              {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>}
              <span className="">Login</span>
          </button>
        </div>
      </div>
    </form>
  </div>
  );
}

export default Login;
