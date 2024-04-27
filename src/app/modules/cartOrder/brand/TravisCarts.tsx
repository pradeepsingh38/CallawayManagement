
import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button,Select } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"
import {getTravisOrder} from "../../../slice/orderSlice/CartOrder"
import {updateQuantity90,updateQuantity88} from "../../../slice/allProducts/TravisMethewSlice"
import {addTravisOrder} from "../../../slice/orderSlice/CartOrder"
import CartHeader from '../CartHeader';


const TravisCart = () => {
    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
   
    const dispatch= useDispatch()

   const getProduct:BasicModelTravis[]=useSelector(getTravisOrder)
     const[amount, setAmount]=useState<number>()
     
     const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "PrimaryImage",
          // fixed: "left",
          width: 25,
        //   render: (value) => (
        //     <span>
        //       <img
        //         src={master}
        //         alt="Primary Image"
        //         style={{ maxWidth: "30px", marginRight: "5px" }}
        //       />
        //     </span>
        //   ),
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 130,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
         
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 70 ,
           fixed: "left",
        },
    
        
        
        {
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Description", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
            const categoryB = b.TravisAttributes?.[0]?.Category ?? "";

          return categoryA.localeCompare(categoryB);
          },
         
        },
        {
            title: "Season",
            dataIndex: "TravisAttributes",
            key: "Season", 
            width: 85,
            render: (value) => <span>{value && value[0] && value[0].Season}</span>,
            sorter: (a, b) => {
              // Extract and compare Season values, handling null or undefined cases
              const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
              const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
              return seasonA.localeCompare(seasonB);
            },
           
          },
        {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Color ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Color ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },

      
        {
          title:"Order Quantity",
          children:[
           { title: "88    QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record) => (
              <Input addonBefore={value[0].Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} 
              />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record) => (
              <Input addonBefore={value[0].Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              
              onChange={(e) => handleQuantity90(e.target.value, record)} 
              />
             
            ),
            }
           
          ],
          
        },
        // {
        //   title:"Quantity",
        //   children:[
        //     {
        //       title: "88",
        //       dataIndex: "quantity88",
        //       key: "quantity88", 
        //       width: 100, 
        //       fixed:'right',
        //       render: (text, record) => (
        //         <Input 
        //          type='number'
        //          value={record.Quantity88?.toString()}
        //           onChange={(e) => handleQuantity88(e.target.value, record)}
        //         />
               
        //       ),
              
        //     },
        //     { title: "90",
        //     dataIndex: "quantity90",
        //     key: "quantity90", 
        //     width: 100,
        //     fixed:'right',
        //     render: (text, record) => (
        //       <Input 
        //        type='number'
        //        value={record.Quantity90?.toString()}
        //         onChange={(e) => handleQuantity90(e.target.value, record)}
        //       />
        //     ),
        //    }
        //   ],
         
          
         
        // },
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 100,
          fixed:'right'
        },
        {
          title: "MRP",
          dataIndex: "SalePrice",
          key: "SalePrice", 
          width: 80,
          fixed:'right'
        },
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount", 
          width: 100,
          fixed:'right'
        },
        
      
      ];


      const handleQuantity90 = (value: string, record: BasicModelTravis) => {

        const intValue = parseInt(value, 10);
    
        if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
          
          // Dispatch an action to update the quantity for the SKU
          
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: intValue,
            MRP: record.SalePrice,
            
          }));
          record.Quantity90=intValue;
          dispatch(addTravisOrder({
            travisOrder:record,
            qty90: intValue,
            qty88:record.Quantity88
          }))
        }
        else{
          alert("Quantity is not available")
          //setQuantity90(0)
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: 0,
          
           
          }));
          record.Quantity90=0;
          
        }
      
        // Log the record for debugging or tracking purposes
        console.log(record);
      };
      const handleQuantity88 = (value: string, record: BasicModelTravis) => {
           console.log("record",record)
        const intValue = parseInt(value, 10);
    
         if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock88&& record.TravisAttributes[0].Stock88 >= intValue) {
          // Dispatch an action to update the quantity for the SKU
          dispatch(updateQuantity88({
            sku: record.SKU,
            qty88: intValue,
            MRP: record.SalePrice,
          }));
          record.Quantity88=intValue;
         // setQuantity88(intValue)
         dispatch(addTravisOrder({
          travisOrder:record,
            qty88: intValue,
            qty90:record.Quantity90
            
        }))
        }
        else if ( record?.TravisAttributes && record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 <intValue) {
          alert("Quantity is not available")
         // setQuantity88(0)
         dispatch(updateQuantity88({
          sku: record.SKU,
          qty88: 0,
        }));
        record.Quantity90=0;
        }
      
      };
   const [totalAmount, setTotalAmount]= useState<number>()
      useEffect(()=>{
        let tAmount:number=0;
        if(getProduct && getProduct.length>0){
          getProduct.map((item:BasicModelTravis)=>{
            if(item.Amount){
              tAmount=item.Amount+tAmount
            }
            
          })
            setTotalAmount(tAmount)
        }
      },[getProduct])
  return (
    <div>
{getProduct && 
getProduct.length>0 &&<CartHeader/>}

{getProduct && 
getProduct.length>0 ?
        (<Table
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item.id }))}
          
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}

            footer={() => (
              <div
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: 8,

                  }}
              >
                  <div style={{ width: "78%" }}>
                      <a style={{ marginRight: 10, color: "#000", }}>Discount</a>
                      <Select
                          showSearch
                          placeholder="Select discount"
                          optionFilterProp="children"


                          options={[
                              {
                                  value: "₹100",
                                  label: "",
                              },
                              {
                                  value: "₹200",
                                  label: "20%",
                              },
                              {
                                  value: "₹300",
                                  label: "30%",
                              },
                          ]}
                      />



                  </div>

                  <div style={{ width: "261px" }}>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
                      </h4>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "94px", paddingLeft: "10px", }}>Discount:</a>
                      </h4>






                      <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                          <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                      </h4>
                  </div>

              </div>
          )}
          />):(
            <div>
              <h2>No order selected</h2>
              </div>
          )}
    </div>
  )
}

export default TravisCart