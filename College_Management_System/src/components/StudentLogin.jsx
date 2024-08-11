import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [values, setValues] = useState({
        student_email: '', 
        student_password: '' 
     })

     const navigate = useNavigate();
 
     const handleSubmit = (event) => {
         event.preventDefault()
         axios.post('http://localhost:3000/student-login', values)
         .then(result => {
            console.log(result.data)
            if (result.data.loginStatus) {
                localStorage.setItem("Valid", true)
                navigate('/auth/dashboard-student')
            } else {
                console.log("Login failed")
            }
         })
         .catch(err => {
            console.log(err)
            console.log("An error occured while logging in")
         })
     }

     const handleBackToRegister = () => {
        navigate('/student-register');
    };

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
      <div className="flex flex-col w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl mt-3 text-center">STUDENT LOGIN PAGE</h1>
        <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <label className="block text-gray text-sm font-bold mt-3" htmlFor="username">
                    Email: 
                </label>
                <input onChange={(e) => setValues({...
                values, student_email : e.target.value})} className="bg-gray-200 shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-black focus:outline-none focus:shadow-outline"
                    id="student_email"
                    type="text"
                    placeholder="Email"
                />
            </div>
            <div className="mt-3">
                <label className="block text-gray text-sm font-bold mt-3" htmlFor="password">
                    Password: 
                </label>
                <input onChange={(e) => setValues({...
                values, student_password : e.target.value})} className="bg-gray-200 shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-black focus:outline-none focus:shadow-outline"
                    id="student_password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div className="flex items-center justify-center mt-4" >
                <button className="bg-gray-900 shadow appearance-none border rounded w-1/3 mt-2 py-2 px-3 text-white focus:outline-none focus:shadow-outline">
                    SIGN IN
                </button>
            </div>
            <div className="flex items-center justify-center mt-10">
                        <button 
                            type="button" 
                            onClick={handleBackToRegister} 
                            className="text-black py-2 px-4 border-none focus:outline-none focus:shadow-outline"
                        >
                            Not have an account? <span className='underline'>Sign up</span>
                        </button>
                    </div>      
        </form>
      </div>
    </div>
  )
}

export default StudentLogin;
