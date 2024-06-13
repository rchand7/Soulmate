import { useEffect, useState } from "react";
import { Button, message, Input } from "antd";
import UseAxiosPublic from "../../../hooks/UseAxiosPublic";
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const axiosPublic = UseAxiosPublic();
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Loading all users
    useEffect(() => {
        axiosPublic.get(`/users`)
            .then(res => {
                setAllUsers(res.data);
            })
            .catch(error => {
                message.error("Failed to load users");
                console.error("Error loading users:", error);
            });
    }, [axiosPublic]);

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            message.warning("Please enter a username to search");
            return;
        }

        try {
            const response = await axiosPublic.get(`/users/username/${searchTerm}`);
            if (response.status === 200) {
                setAllUsers(response.data);
                if (response.data.length === 0) {
                    message.info(`No users found with username "${searchTerm}"`);
                }
            }
        } catch (error) {
            message.error("Failed to search users");
            console.error("Error searching users:", error);
        }
    };

    const handleMakePremium = async (id, name) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to make ${name} a premium user?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosPublic.patch(`/users/make-premium/${id}`);
                if (response.status === 200) {
                    message.success(`${name} is now a premium user.`);
                    // Update the user status in state
                    setAllUsers(users =>
                        users.map(user => user._id === id ? { ...user, subscription: 'premium' } : user)
                    );
                }
            } catch (error) {
                message.error(`Failed to make ${name} a premium user.`);
                console.error("Error making user premium:", error);
            }
        }
    };

    const handleMakeAdmin = async (id, name) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to make ${name} an admin?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosPublic.patch(`/users/make-admin/${id}`);
                if (response.status === 200) {
                    message.success(`${name} is now an admin.`);
                    // Update the user role in state
                    setAllUsers(users =>
                        users.map(user => user._id === id ? { ...user, role: 'admin' } : user)
                    );
                }
            } catch (error) {
                message.error(`Failed to make ${name} an admin.`);
                console.error("Error making user admin:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage All Users</h2>
            <div className="mb-4">
                <Input.Search
                    placeholder="Search by username"
                    enterButton
                    onSearch={handleSearch}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user) => (
                            <tr key={user._id} className=" odd:bg-gray-900 even:bg-gray-800 border-b border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                    {user.username}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.subscription === 'regular' ? (
                                        <Button
                                            type="primary"
                                            ghost
                                            className="mr-4"
                                            onClick={() => handleMakePremium(user._id, user.username)}
                                        >
                                            Make Premium
                                        </Button>
                                    ) : (
                                        <Button type="primary" className="mr-4">
                                            Premium User
                                        </Button>
                                    )}
                                    {user.role === 'user' ? (
                                        <Button
                                            type="primary"
                                            ghost
                                            danger
                                            onClick={() => handleMakeAdmin(user._id, user.username)}
                                        >
                                            Make Admin
                                        </Button>
                                    ) : (
                                        <Button type="primary" className="mr-4">
                                            Admin
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
