import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaDeleteLeft } from "react-icons/fa6";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from '../../../Redux/services/CategoryCreateApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddCategory() {
  let [createCategory] = useCreateCategoryMutation()
  let { data, isLoading, isError, refetch } = useGetCategoriesQuery()
  let [deleteCategory] = useDeleteCategoryMutation()

  const formik = useFormik({
    initialValues: {
      name: '',

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 or more characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await createCategory(values).unwrap()
        toast.success("Category added successfully!", {
          position: "top-right",
          autoClose: 2000
        });
        formik.resetForm();
        await refetch()
      } catch (error) {
        toast.error(error?.data?.message || "Category creation failed", {
          position: "top-right"
        });
        formik.resetForm();
      }
    },
  });
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error...</div>

  async function handleDelete(id) {

    try {
      console.log(id);
      await deleteCategory(id)
      toast.success("Category deleted successfully!", {
        position: "top-right",
        autoClose: 2000
      });
      await  refetch()

    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Category deletion failed", {
        position: "top-right"
      });

    }
  }

  return (
    <div className='content'>
      <ToastContainer />
      <div className="admin-wrapper">
        <div>
          <h2>Add Category</h2>
          <form onSubmit={formik.handleSubmit}>

            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              placeholder="Category Name"
            />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}

            <button type="submit">Add Category</button>
          </form>
        </div>
        <div className="table-content">
          <h2>Existing Categories</h2>
          <TableContainer component={Paper} style={{ backgroundColor: "#1E293B" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="center" >Name</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{textTransform:"capitalize"}} align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="center"  >
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

export default AddCategory