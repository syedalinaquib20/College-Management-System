import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const ListStudentsEvents = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [success, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get('http://localhost:3000/auth/admin/list-students-with-events', {
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
            setError("Failed to fetch the students events");
        });
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredStudents(students.filter(student => 
            student.student_name.toLowerCase().startsWith(value.toLowerCase())
        ));
        setCurrentPage(1);
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

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
            console.log(response.data);
            if(response.data && response.data.message) {
                setSuccessMessage(response.data.message);
            } else {
                setSuccessMessage("Student deleted successfully");
            }
            setError('');
            setTimeout(() => {
                navigate('/auth/admin/dashboard');
            }, 2000);
        })
        .catch(error => {
            console.error(error);
            setSuccessMessage('');
            if(error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occured");
            }
            setTimeout(() => {
                navigate('/auth/admin/dashboard');
            }, 2000);
        });
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePageChange = (e) => {
        const pageNumber = parseInt(e.target.value);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    }

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
                <div className="flex flex-col w-full max-w-6xl bg-cover bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center ml-2">
                            <label htmlFor="itemsPerPage" className="mr-2 text-black">Show</label> 
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <span className="ml-2 text-black">entries</span>
                        </div> 
                        <h1 className="text-2xl text-black mx-auto">List of Students</h1>
                        <input 
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="shadow appearance-none border rounded w-2/12 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        />
                    </div>
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
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white text-black text-left mt-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Student Name</th>
                                    <th className="px-4 py-2">Student Email</th>
                                    <th className="px-4 py-2">Student Points</th>
                                    <th className="px-4 py-2">Event Details</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map(student => (
                                    <tr key={student.student_id}>
                                        <td className="border px-4 py-2 text-left">{student.student_name}</td>
                                        <td className="border px-4 py-2 text-left">{student.student_email}</td>
                                        <td className="border px-4 py-2 text-left">{student.student_points}</td>
                                        <td className="border px-4 py-2 text-left">{student.event_name}</td>
                                        <td className="border px-4 py-2 text-left">
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleUpdate(student.student_id)}
                                                    className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-2 rounded flex items-center space-x-1"
                                                >
                                                    <FaEdit />
                                                    <span>Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.student_id)}
                                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded flex items-center space-x-1"
                                                >
                                                   <MdDelete />
                                                   <span>Delete</span>
                                                </button>
                                            </div>   
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                    <span className="text-black">{`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem} of ${filteredStudents.length}`}</span>
                    <div className="flex space-x-2">
                        <button 
                                onClick={() => paginate(currentPage - 1)} 
                                disabled={currentPage === 1}
                                className="text-black px-1 py-3"
                            >
                                Previous 
                            </button>
                            <input 
                                type="number"
                                value={currentPage}
                                onChange={handlePageChange}
                                className="border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                                style={{ width: '50px'}}
                                min={1}
                                max={totalPages}
                            />
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="text-black px-1 py-3"
                            >
                                Next
                            </button>
                    </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListStudentsEvents;
