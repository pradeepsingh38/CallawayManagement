import React from 'react'
import { useState, useEffect } from 'react'

import {getCurrentUser,getAdminToken,
  getUserAccount,getUserInfo,
  getUserOrders,addUser,
  addUserAccount} from "../slice/UserSlice/UserSlice"
import { useSelector, useDispatch } from 'react-redux'

import {getTravisProducts,getCategory,getStyleCode,getOtherProducts} from "../slice/allProducts/TravisMethewSlice";
import {getOgioProducts} from "../slice/allProducts/OgioSlice"

import { useAuth } from '../modules/auth/core/Auth'
const Reload = () => {
    const dispatch = useDispatch();
    const { saveAuth, setCurrentUser } = useAuth()
    const getCurrentUsers= useSelector(getCurrentUser);
    const getAdminTokens= useSelector(getAdminToken);
    const getUserAccounts= useSelector(getUserAccount);
    const getUserInfos= useSelector(getUserInfo);
    const getUserOrder= useSelector(getUserOrders);
    const getTravisProduct= useSelector(getTravisProducts)
   const getOgioProduct = useSelector(getOgioProducts)
    const getOtherProduct = useSelector(getOtherProducts)
    const getCategorys = useSelector(getCategory)
    const getStyleCodes = useSelector(getStyleCode)
    useEffect(()=>{
      // eslint-disable-next-line no-debugger
      debugger
     if(getCurrentUsers &&
         getUserAccounts&&
         getUserInfos &&
         getTravisProduct
       
        ){
            localStorage.setItem('getCurrentUsers',JSON.stringify(getCurrentUsers))
            localStorage.setItem('getAdminTokens',JSON.stringify(getAdminTokens))
            localStorage.setItem('getUserAccounts',JSON.stringify(getUserAccounts))
            localStorage.setItem('getUserInfos',JSON.stringify(getUserInfos))
            localStorage.setItem('getOtherProduct',JSON.stringify(getOtherProduct))
            localStorage.setItem('getTravisProduct',JSON.stringify(getTravisProduct))
            localStorage.setItem('getOgioProduct', JSON.stringify(getOgioProduct))
            localStorage.setItem('getCategorys', JSON.stringify(getCategorys))
            localStorage.setItem('getStyleCodes', JSON.stringify(getStyleCodes))
     }

    },[getCurrentUsers,
      getAdminTokens,
      getUserAccounts,
      getUserInfos,
      getUserOrder,
      getTravisProduct,
      getOgioProduct]);

      useEffect(()=>{
        // eslint-disable-next-line no-debugger
        debugger
        if(getCurrentUsers && getCurrentUsers.length===0){
           dispatch(addUser({
            currentUser:JSON.parse(localStorage.getItem('getCurrentUsers') as string)
           }))
           saveAuth(JSON.parse(localStorage.getItem('getCurrentUsers') as string))
        }
        if(getUserAccounts && getUserAccounts.length===0){
           dispatch(addUserAccount({
            UserAccount:JSON.parse(localStorage.getItem('getUserAccounts') as string)
           }))
           setCurrentUser(JSON.parse(localStorage.getItem('getUserAccounts') as string))
        }
      },
      [])
  return (
    <div></div>
  )
}

export default Reload