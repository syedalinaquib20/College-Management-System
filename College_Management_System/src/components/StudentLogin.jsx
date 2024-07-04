
import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
    const [values, setValues] = useState({
        student_email: '', 
        student_password: '' 
     })
 
     const handleSubmit = (event) => {
         event.preventDefault()
         axios.post('http://localhost:3000/')
         .then(result => console.log(result))
         .catch(err => console.log(err))
     }

  return (
    <div className="min-h-screen w-full bg-gray-200 flex flex-col items-center justify-center">
      <div className="flex flex-col w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl mt-3 text-center">STUDENT LOGIN PAGE</h1>
        <form onSubmit={handleSubmit}>
            <div className="mt-3">
                <label className="block text-gray text-sm font-bold mt-3" htmlFor="username">
                    Email: 
                </label>
                <input onChange={(e) => setValues({...
                values, student_email : e.target.value})} className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
                values, student_password : e.target.value})} className="shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                    id="student_password"
                    type="password"
                    placeholder="Password"
                />
            </div>
            <div className="flex items-center justify-center mt-4" >
                <button className="bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    SIGN IN
                </button>
            </div>
            <div className="flex items-center justify-center mt-4 ">
                <span>Don't have an account yet?</span>
                <Link to="/student-register" className="text-blue-500 hover:underline ml-1">
                    Register
                </Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default StudentLogin;
