
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;
const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL
const serverApi = import.meta.env.VITE_APP_MY_SERVER_URL

export function GetAllUserOrders(user_id: number) {
    const payload = {
        id: user_id
    }
    return axios.post(`${serverApi}/get-user-orders`, payload)
        .then(response => {
            return response.data
        }).catch(error => {
            throw error;
        });


}
export function GetAllManagerOrder(user_id: number) {
    const payload = {
        id: user_id
    }
    return axios.post(`${serverApi}/get-manager-orders`, payload)
        .then(response => {
            return response.data
        }).catch(error => {
            throw error;
        });


}
export function GetAllRetailerOrder(user_id: number) {
    const payload = {
        id: user_id
    }
    return axios.post(`${serverApi}/get-retailer-orders`, payload)
        .then(response => {
            return response.data
        }).catch(error => {
            throw error;
        });


}
export function GetAllSaleRepresentationOrder(user_id: number) {
    const payload = {
        id: user_id
    }
    return axios.post(`${serverApi}/get-salesRep-orders`, payload)
        .then(response => {
            return response.data
        }).catch(error => {
            throw error;
        });


}
export function GetAllAdminOrder() {
   
    return axios.get(`${serverApi}/get-allorders`)
        .then(response => {
            return response.data
        }).catch(error => {
            throw error;
        });


}



