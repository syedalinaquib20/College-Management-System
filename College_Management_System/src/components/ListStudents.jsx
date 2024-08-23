import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const ListStudents = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:3000/auth/admin/admin-list-students', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            const sortedStudents = response.data.student.sort((a, b) => 
                a.student_name.localeCompare(b.student_name)
        );
            setStudents(sortedStudents);
            setFilteredStudents(sortedStudents);
        })
        .catch(error => {
            console.error(error);
            setError('Failed to fetch the students');
        });
    }, []); 

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredStudents(students.filter(student => 
            student.student_name.toLowerCase().includes(value.toLowerCase())
        ));
        setCurrentPage(1);
    };

    const back = () => {
        navigate("/auth/admin/dashboard");
    }

    const handleUpdate = (id) => {
        navigate(`/auth/admin/admin-update-student/${id}`);
    }

    const handleDelete = (studentId) => {
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:3000/auth/admin/admin-delete-student/${studentId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);
            } else {
                setSuccessMessage("Student deleted successfully!");
            }

            setError('')
            setTimeout(() => {
                navigate('/auth/admin/dashboard');
            }, 2000)
        })
        .catch(error => {
            console.error(error);
            setSuccessMessage('');
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred');
            }
            setTimeout(() => {
                navigate('/auth/admin/dashboard');
            }, 2000)
        })
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
                <div className="flex flex-col w-full md:w-11/12 lg:w-9/12 bg-cover bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-2xl text-center text-black mb-4">List of Students</h1>
                    {success && (
                            <div className="bg-green-500 text-white p-4 rounded my-4">
                                {success}
                            </div>
                    )}

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
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-black text-left mt-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Student Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Gender</th>
                                    <th className="px-4 py-2">Total Points</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(student => (
                                    <tr key={student.student_id}>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{student.student_name}</td>                                       
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{student.student_email}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{student.student_gender}</td>
                                        <td className="border px-4 py-2 text-left whitespace-nowrap">{student.total_points}</td>
                                        <td className="border px-4 py-2 text-left">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleUpdate(student.student_id)}
                                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded mr-2"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.student_id)}
                                                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-2 rounded mr-2"
                                                >
                                                    Delete
                                                </button>
                                            </div>    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button 
                            onClick={() => paginate(currentPage - 1)} 
                            disabled={currentPage === 1}
                            className="text-black underline px-1 py-3"
                        >
                           Previous 
                        </button>
                        <span className="text-black">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="text-black underline px-1 py-3"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListStudents;
