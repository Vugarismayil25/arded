import "./style.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaDeleteLeft } from "react-icons/fa6";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDeleteUserMutation, useGetAllUsersQuery, useRegisterMutation } from "../../../Redux/services/UserCreateApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Users() {
  const [register] = useRegisterMutation()

  const { data: userData, isLoading, isError, refetch } = useGetAllUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const formik = useFormik({
    initialValues: {
      name: '',
      role: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 or more characters')
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      role: Yup.string()
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await register(values).unwrap();
        toast.success("User added successfully!", {
          position: "top-right",
          autoClose: 2000
        });
        formik.resetForm();
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || "Registration failed", {
          position: "top-right"
        });
      }
    }
  });
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>
  async function handleDelete(id) {
    try {
      await deleteUser(id).unwrap()
      toast.success("User deleted successfully!", {
        position: "top-right",
        autoClose: 2000
      });
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || "User deletion failed", {
        position: "top-right"
      });
    }
  }
  return (


    <div className='content'>
      <ToastContainer />
      <div className="admin-wrapper">
        <div>
          <h2>Add User</h2>
          <form onSubmit={formik.handleSubmit}>

            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}


            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}


            <input
              id="role"
              name="role"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              placeholder="role"
            />
            {formik.touched.role && formik.errors.role ? (
              <div>{formik.errors.role}</div>
            ) : null}

            <button type="submit">Add User</button>
          </form>
        </div>
        <div className="table-content">
          <h2>Existing Users</h2>
          <TableContainer component={Paper} style={{ backgroundColor: "#1E293B" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell >Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{ textTransform: "capitalize" }} component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell style={{ textTransform: "capitalize" }} align="center">{row.role}</TableCell>
                    <TableCell align="center">
                      < FaDeleteLeft
                        style={{ color: "brown", fontSize: "20px", cursor: "pointer" }}
                        onClick={() => handleDelete(row._id)}
                      /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  )
}

export default Users 