import { useLoaderData } from "react-router-dom";



const AllUser = () => {
    const users = useLoaderData();

    return (
        <div className="np">
            <h3 className="text-3xl font-semibold my-4">Total Users: {users?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>

                                {
                                    user.role === 'Admin' ? (
                                        <>
                                            <td>Admin</td>
                                            <td></td>
                                        </>
                                    ) : user.role === 'Seller' ? (
                                        <td>Seller</td>
                                    ) : user.role === 'Rider' ? (
                                        <td>Rider</td>
                                    ) : (
                                        <td>Customer</td>
                                    )
                                }
                          
                            </tr>
                            )
                        }
                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;