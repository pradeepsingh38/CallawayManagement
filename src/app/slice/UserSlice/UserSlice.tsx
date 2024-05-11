import { createSlice } from "@reduxjs/toolkit";
import {UserAccountModel,OrderData} from "../../modules/model/useAccount/UserAccountModel";
import {AccountOrder} from "../../modules/model/CartOrder/CartModel"
// Define interface for Redux state
interface UserState {
    currentUser: unknown[],
    UserAccount: UserAccountModel[],
    UserRetailer:unknown[]
    adminToken: null | string,
    userOrders: AccountOrder[],
}


const UserSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: [],
        UserAccount: [],
        UserRetailer:[],
        adminToken: null,
        userOrders:[]
    } as UserState, 
    reducers: {
        resetUserAccount:(state)=>{
        state.currentUser=[];
        state.UserAccount=[];
        state.UserRetailer=[];
        state.adminToken=null;
            state.userOrders=[];
        },
        addUser: (state, action) => {
            state.currentUser = action.payload.currentUser;
            state.UserAccount=action.payload.UserAccount;
            state.adminToken=action.payload.adminToken;
            state.UserRetailer=action.payload.UserRetailer;

        },
        addUserAccount: (state, action) => {
            state.UserAccount = action.payload.UserAccount;
        },
        // addUserInfo: (state, action) => {
        //     state.UserInfo = action.payload.UserInfo;
        // },
        addAdminToken: (state, action) => {
            state.adminToken = action.payload.adminToken;
        }, 
        addUserOrders:(state,action)=>{
            state.userOrders = action.payload.userOrders
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
              const index = state.userOrders.findIndex(
                (order) => order.id=== orderId
              );
              if (index !== -1 && state.userOrders[index]?.attributes) {
                state.userOrders[index].attributes = {
                    ...state.userOrders[index].attributes,
                    Status: status
                };
            }
        },
    
    }
});


export const { addUser, addUserAccount,
    addAdminToken ,
    addUserOrders,updateOrderStatus,resetUserAccount} = UserSlice.actions;


export const getCurrentUser = (state: { user: UserState }) => state.user.currentUser;
export const getAdminToken = (state: { user: UserState }) => state.user.adminToken;
export const getUserAccount = (state: { user: UserState }) => state.user.UserAccount
export const getUserRetailer = (state: { user: UserState }) => state.user.UserRetailer
export const getUserOrders = (state: { user: UserState }) => state.user.userOrders
// Export reducer
export default UserSlice.reducer;
