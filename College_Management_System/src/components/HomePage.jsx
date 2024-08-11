import { useNavigate } from 'react-router-dom';
import { RiAdminFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";

const HomePage = () => {
     const navigate = useNavigate();

    const navigateAdminLogin = () => {
        navigate('/admin-login');
    };

    const navigateStudentLogin = () => {
        navigate('/student-login');
    };

    return (
        <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center">
            <div className="bg-white text-black w-3/4 py-10 px-10 rounded-lg shadow-lg mb-12">
                <h1 className="text-5xl text-center">COLLEGE COUPON COUNTING SYSTEM</h1>
                <div className="flex justify-center mt-10 p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full max-w-3xl">
                        <div 
                            onClick={navigateAdminLogin} 
                            className="flex flex-col items-center bg-slate-100 rounded-lg shadow-lg p-8 space-y-4 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
                        >
                            <RiAdminFill className="h-24 w-24 text-black" />
                            <span className="text-black text-2xl px-6 py-4 rounded-lg w-full text-center">ADMIN</span>
                        </div>
                    <div 
                        onClick={navigateStudentLogin} 
                        className="flex flex-col items-center bg-slate-100 rounded-lg shadow-lg p-8 space-y-4 cursor-pointer hover:shadow-2xl transition transform hover:scale-105"
                    >
                        <PiStudentBold className="h-24 w-24 text-black"/>
                        <span className="text-black text-2xl px-6 py-4 rounded-lg w-full text-center">STUDENT</span>
                    </div>
                </div>    
            </div>
            </div>
            
        </div>
    );
}

export default HomePage;
