import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaDeleteLeft } from "react-icons/fa6";
import { useCreateImageMutation, useDeleteImageMutation, useGetAllImagesQuery } from '../../../Redux/services/ImageCreateApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetCategoriesQuery } from '../../../Redux/services/CategoryCreateApi';

function AddImage() {
  const [preview, setPreview] = useState(null);
  const [createImage] = useCreateImageMutation();
  const [deleteImage] = useDeleteImageMutation()
  const { data: images, isLoading, isError, refetch } = useGetAllImagesQuery();
  const { data: categories, isLoading: categLoading, isError: categError } = useGetCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      category: '',
      slide: '',
      section: '',
      image: null,
    },
    validationSchema: Yup.object({
      section: Yup.string().required('Section is required'),

      slide: Yup.number().when('section', {
        is: 'portfolio',
        then: schema => schema
          .required('Slide is required')
          .oneOf([1, 2, 3, 4, 5], 'Invalid slide number'),
        otherwise: schema => schema.nullable(),
      }),

      category: Yup.string().when('section', {
        is: 'service',
        then: schema => schema
          .required('Category is required')
          .matches(/^[0-9a-fA-F]{24}$/, 'Invalid category ID'),
        otherwise: schema => schema.nullable(),
      }),

      image: Yup.mixed()
        .required('Image is required')
        .test('fileSize', 'Image must be less than 20MB', value =>
          value && value.size <= 20 * 1024 * 1024)
        .test('fileType', 'Only .jpg and .png files are allowed', value =>
          value && ['image/jpeg', 'image/png'].includes(value.type)),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("section", values.section);
      if (values.section === "portfolio" && values.slide)
        formData.append("slide", values.slide);
      if (values.section === "service" && values.category)
        formData.append("category", values.category);
      formData.append("image", values.image);

      try {
        await createImage(formData).unwrap();
        toast.success("Image added successfully!", { position: "top-right", autoClose: 2000 });
        formik.resetForm();
        await refetch()
        setPreview(null);
      } catch (error) {
        toast.error(error?.data?.message || "Image creation failed", { position: "top-right" });
        formik.resetForm();
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);

    if (file && ['image/jpeg', 'image/png'].includes(file.type) && file.size <= 20 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  if (isLoading || categLoading) return <div>Loading...</div>;
  if (isError || categError) return <div>Error loading</div>;
  async function handleDelete(id) {
    try {
      console.log(id);
      await deleteImage(id)
      toast.success("Image deleted successfully!", {
        position: "top-right",
        autoClose: 2000
      });
      await refetch()

    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "Image deletion failed", {
        position: "top-right"
      });

    }
  }
  return (
    <div className='content'>
      <ToastContainer />
      <div className="admin-wrapper">
        <div>
          <h2>Add Image</h2>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="file"
              name="image"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            {formik.touched.image && formik.errors.image && <div>{formik.errors.image}</div>}

            {preview && (
              <div>
                <p>Image Preview:</p>
                <img src={preview} alt="Preview" width="150" />
              </div>
            )}

            <select {...formik.getFieldProps('section')}>
              <option disabled value="">Select Section</option>
              <option value="service">Service</option>
              <option value="portfolio">Portfolio</option>
            </select>
            {formik.touched.section && formik.errors.section && <div>{formik.errors.section}</div>}

            {formik.values.section === "service" && (
              <select {...formik.getFieldProps('category')}>
                <option disabled value="">Select Category</option>
                {categories?.data?.map(category => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            )}
            {formik.touched.category && formik.errors.category && <div>{formik.errors.category}</div>}

            {formik.values.section === "portfolio" && (
              <select {...formik.getFieldProps('slide')}>
                <option disabled value="">Select Slide</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            )}
            {formik.touched.slide && formik.errors.slide && <div>{formik.errors.slide}</div>}

            <button type="submit">Add</button>
          </form>
        </div>

        {/* IMAGE TABLE CONTENT */}
        <div className="table-content">
          <h2>Existing Images</h2>
          <TableContainer component={Paper} style={{ backgroundColor: "#1E293B" }}>
            <Table sx={{ minWidth: 650 }} aria-label="image table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Category Name</TableCell>
                  <TableCell align="center">Slide Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {images?.data?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <img src={row.image} alt="img" width="70px" height="70px" />
                    </TableCell>
                    <TableCell align="center">{row.category?.name || "-"}</TableCell>
                    <TableCell align="center">{row.slide || "-"}</TableCell>
                    <TableCell align="center">
                      <FaDeleteLeft
                        style={{ color: "brown", fontSize: "20px", cursor: "pointer" }}
                        onClick={() => handleDelete(row._id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default AddImage;
