import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const ListStudents = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect (() => {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/auth/admin/admin-list-students', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            setStudents(response.data.students);
            setFilteredStudents(response.data.students);
        })
        .catch(error => {
            console.error(error);
            setError("Failed to fetch the students");
        })
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredStudents(students.filter(student => {
            student.student_name.toLowerCase().startsWith(value.toLowerCase())
        }));
        setCurrentPage(1);
    }
    
    const formateDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString('en-GB', options);
    }

    const back = () => {
        navigate("/auth/admin/dashboard");
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <header className="bg-gray-700 text-white p-6 rounded-t-lg shadow-lg flex justify-between items-center w-full">
                <div className="flex justify-end w-full">
                    <button onClick={back} className="text-white bg-blue-600 py-3 px-3 border rounded-lg hover:bg-blue-800 flex items-center">
                        <IoArrowBackSharp className="w-6"/>
                        <span>Back</span>
                    </button>
                </div>
            </header>

            <div className="flex justify-center items-center flex-grow mt-4">
                <div className="flex flex-col md:w-8/12 lg:w-6/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl text-center text-black mb-4">List of Students</h1>
                        {error && (
                            <div className="bg-red-500 text-white p-4 rounded mb-4"> 
                                {error}
                            </div>
                        )}
                        <input 
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 focus:outline-none focus:shadow-outline"
                        />
                        <table className="min-w-full bg-white text-black text-left mt-2">
                            <thead>
                                <tr>
                                    <th className="w-1/3 px-4 py-2">Student Name</th>
                                    <th className="w-1/4 px-4 py-2">Student Email</th>
                                    <th className="w-1/4 px-4 py-2">Student Points</th>
                                    <th className="w-1/4 px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(student => (
                                    <tr key={student.student_id}>
                                        <td className="border px-4 py-2 text-left">{student.student_name}</td>
                                        <td className="border px-4 py-2 text-left">{student.student_email}</td>
                                        <td className="border px-4 py-2 text-left">{student.student_points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default ListStudents
