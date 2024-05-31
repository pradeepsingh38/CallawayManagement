import React, { useEffect } from 'react'
import { GetUserOrder } from './api/_orderRequest'
import { addUserOrders, getCurrentUser, getUserAccount } from '../../slice/UserSlice/UserSlice'
import { useDispatch, useSelector } from "react-redux"
import { GetAllAdminOrder, GetAllManagerOrder, GetAllRetailerOrder, GetAllUserOrders } from '../../api/order/OrederApi'


type Props = {

    resetOrder: () => void
}

const GetAllorder = ({ resetOrder }: Props) => {


    const getCurrentUsers = useSelector(getCurrentUser)
    const dispatch = useDispatch()

    useEffect(() => {
  // eslint-disable-next-line no-debugger
  debugger
        if (getCurrentUsers && getCurrentUsers.role === "Manager" && getCurrentUsers.id) {
            getManagerOrder(getCurrentUsers.id)
        }
        else if (getCurrentUsers && getCurrentUsers.role === "Retailer" && getCurrentUsers.id) {
            getRetailerOrder(getCurrentUsers.id)
        }
        else if (getCurrentUsers && getCurrentUsers.role === "Admin") {
            getAdminOrder()
        }




    }, [getCurrentUsers])

    const getManagerOrder = async (user_id: number) => {


        try {
            const response = await GetAllManagerOrder(user_id)
            if (response) {
                dispatch(addUserOrders({
                    userOrders: response
                }))

                resetOrder()
            }

        } catch (error) {
            console.log("Error", error)
            
        }
    }
    const getRetailerOrder = async (user_id: number) => {


        try {
            const response = await GetAllRetailerOrder(user_id)
            if (response) {
                dispatch(addUserOrders({
                    userOrders: response
                }))

                resetOrder()
            }

        } catch (error) {
            console.log("error", error)
        }
    }
    const getAdminOrder = async () => {


        try {
            const response = await GetAllAdminOrder()
            if (response) {
                dispatch(addUserOrders({
                    userOrders: response
                }))

                resetOrder()
            }

        } catch (error) {
            console.log("error", error)
        }
    }


    return (
        <div>GetAllorder</div>
    )
}

export default GetAllorder