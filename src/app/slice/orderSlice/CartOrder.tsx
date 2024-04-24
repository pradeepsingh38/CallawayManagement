import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {BasicModelTravis,TravisMathewAttribute} from "../../modules/brands/model/travis/TravisMethewModel"
interface ProductState {
    TravisOrder: BasicModelTravis[];
}

const initialState: ProductState = {
    TravisOrder: [],
};

const OrderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        resetOrder:(state)=>{
            return initialState;
        },
        addTravisOrder:(state,action)=>{
            const {travisOrder,qty90,qty88}=action.payload;
            if(travisOrder ) {
               const index=  state.TravisOrder.findIndex(item=>item.SKU===travisOrder.SKU);
                   if(index===-1){
                    const att: TravisMathewAttribute[] = [
                        {
                          StyleCode: travisOrder.TravisAttributes[0].StyleCode,
                          Length: travisOrder.TravisAttributes[0].Length,
                          Category: travisOrder.TravisAttributes[0].Category,
                          Season: travisOrder.TravisAttributes[0].Season,
                          Line: travisOrder.TravisAttributes[0].Line,
                          Color: travisOrder.TravisAttributes[0].Color,
                          ColorCode: travisOrder.TravisAttributes[0].ColorCode,
                          Size: travisOrder.TravisAttributes[0].Size,
                          Gender: travisOrder.TravisAttributes[0].Gender || "", // Assuming Gender might be optional
                        },
                      ];
              
                      state.TravisOrder.push({
                        Name: travisOrder.Name,
                        Description: travisOrder.Description,
                        SKU: travisOrder.SKU,
                        StockManagement: travisOrder.StockManagement,
                        StockStatus: travisOrder.StockStatus,
                        RegularPrice: travisOrder.RegularPrice,
                        SalePrice: travisOrder.SalePrice,
                        StockAvailable88: travisOrder.StockAvailable88,
                        StockAvailable90: travisOrder.StockAvailable90,
                        SetType: travisOrder.SetType,
                        ProductType: travisOrder.ProductType,
                        TravisAttributes: att,
                        Quantity88:qty88,
                        Quantity90:qty90,
                        Amount: (qty88+qty90)*travisOrder.RegularPrice,
                        TotalQty: qty88+qty90,
                      });
                   }else {
                    state.TravisOrder[index].Quantity90=travisOrder.Quantity90;
                    state.TravisOrder[index].Quantity88=travisOrder.Quantity88;
                    const qty88=state.TravisOrder[index].Quantity88||0;
                    const qty90=state.TravisOrder[index].Quantity90||0;
                    const regularPrice=state.TravisOrder[index].RegularPrice||0;
                    state.TravisOrder[index].TotalQty=qty88+qty90
                    state.TravisOrder[index].Amount=regularPrice*(qty88+qty90);
                    state.TravisOrder[index].ordered=true;
                   }
            }
        }
    }
})

export const {
    addTravisOrder,
    resetOrder
     
} = OrderSlice.actions;
export const getTravisOrder = (state: { Order: ProductState }): BasicModelTravis[] => {
    return state.Order?.TravisOrder || [];
};

export default OrderSlice.reducer;

