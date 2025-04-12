import React from 'react'
import "./style.css"
import {  FaImages, FaUsers } from 'react-icons/fa';
import { TbCategoryFilled } from "react-icons/tb";
import { useGetAllUsersQuery } from '../../../Redux/services/UserCreateApi';
import { useGetCategoriesQuery } from '../../../Redux/services/CategoryCreateApi';
import { useGetAllImagesQuery } from '../../../Redux/services/ImageCreateApi';






function Dashboard() {
  const { data: userData, isLoading, isError } = useGetAllUsersQuery()
  const { data: categData, isLoading: categLoading, isError: catgError } = useGetCategoriesQuery()
  const { data: imgData, isLoading: imgLoading, isError: imgError } = useGetAllImagesQuery()
  if (isLoading || categLoading || imgLoading ) {
    return <div className='loading'>Loading...</div>
  }
  if (isError || catgError || imgError ) {
    return <div className='error'>Error fetching data</div>
  }
 
  return (
    <div className='content'>

      <div className='dashboard'>

        <div className="total">

          <div className="total-card">
            <span className='card-icon' ><FaUsers /></span>
            <div className='card-desc'>
              <h4>Total Users</h4>
              <span className='size'>{userData?.data?.length}</span>
            </div>
          </div>
          <div className="total-card">
            <span className='card-icon' ><TbCategoryFilled /></span>
            <div className='card-desc'>
              <h4>Total Categories</h4>
              <span>{categData?.data?.length}</span>
            </div>
          </div>
          <div className="total-card">
            <span className='card-icon' ><FaImages /></span>
            <div className='card-desc'>
              <h4>Total Images</h4>
              <span>{imgData?.data?.length}</span>
            </div>
          </div>
        </div>
     
      </div>
    </div>
  )
}

export default Dashboard 