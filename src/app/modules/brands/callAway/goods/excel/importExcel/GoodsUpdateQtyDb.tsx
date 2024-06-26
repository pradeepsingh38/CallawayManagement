import React, { useEffect, useState } from 'react'
import { BasicModelGoods } from '../../../../../model/goods/CallawayGoodsModel'
import { UpDateGoodsQty } from '../../api/UpdateProductData';
import { useDispatch } from "react-redux"
 import { updateGoodsQty } from '../../../../../../slice/allProducts/CallAwayGoodsSlice';

type props = {
    allQtyXlxData : BasicModelGoods[];
    resetQtyData: (allresponse: string)=> void 
}
 const GoodsUpdateQtyDb = ({allQtyXlxData, resetQtyData}: props) => {
    const dispatch = useDispatch()
    useEffect(() => {
   
        if (allQtyXlxData && allQtyXlxData.length > 0){
            updateQty(allQtyXlxData)
           // console.log("up",allQtyXlxData)
        }
    },[allQtyXlxData] )
   // console.log("db",allQtyXlxData)

    const updateQty = (allQtyXlxData: BasicModelGoods[]) =>{
        //console.log("qt1",allQtyXlxData)
        const allQtData: BasicModelGoods[] = []
        if (allQtyXlxData && allQtyXlxData.length > 0){
            allQtyXlxData.map(item => {
                const updateQuantity ={
                    
                    sku : item.sku,
                    stock_88: item.stock_88
                    
                }
                allQtData.push(updateQuantity)
            })
        }
        updateQtyApi(allQtData)

    }

    const updateQtyApi = async (data : BasicModelGoods[]) => {
       // console.log("qt2",data)

        try {
            const response = await UpDateGoodsQty(data);

            if (response.status == 200 && response.data) {
                dispatch(updateGoodsQty({
                    allQtyGoods: data
                }))
                resetQtyData(response.data.message)
            }

        } catch (e) {
            alert("Error updating travis stock quantity");
            resetQtyData("")
        }
    }


    return (

        <div></div>
    )

    

 }

 export default GoodsUpdateQtyDb