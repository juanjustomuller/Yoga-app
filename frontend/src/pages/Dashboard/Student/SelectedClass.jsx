import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemsPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`cart/${currentUser?.email}`)
      .then((res) => {
        console.log("res.data:", res.data)
        setClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="my-6">
        <h1 className="text-4xl text-center font-bold">
          My <span className="text-secondary">Selected</span> Class
        </h1>
      </div>


    <div className="h-screen py-8">
        <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart: </h2>
            <div className="flex flex-col md:flex-row gap-4">
                {/* LEFT DIV */}
                <div className="md:w-3/4 border border-red-300">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-left font-semibold">#</th>
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-left font-semibold">Price</th>
                                    <th className="text-left font-semibold">Date</th>
                                    <th className="text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody>
                                {
                                    classes.length === 0 ? <tr><td colSpan='5' className="text-center text-2xl font-bold">No Classes Found</td></tr> : 
                                    classes.map((item, index) => {
                                        return <td>{index}</td>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>



                {/* RIGHT DIV */}
                <div className="md:w-1/5 fixed right-3">RIGHT</div>
            </div>
        </div>
    </div>

    </div>
  );
};

export default SelectedClass;
