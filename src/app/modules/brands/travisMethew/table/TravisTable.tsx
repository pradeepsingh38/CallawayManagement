import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"
import {getTravisProducts,getOtherProducts} from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';

import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import {ExcelModelTravis} from "../../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import * as XLSX from 'xlsx';

 import {updateQuantity90,updateQuantity88,
  addOtherProduct,updateOtherQuantity90,
  updateOtherQuantity88,removeOtherProduct} from "../../../../slice/allProducts/TravisMethewSlice"
 import { Cascader,Select, Space } from 'antd';
import {addTravisOrder,removeTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';

import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import TravisPdf from '../pdf/TravisPdf';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import ImageRenderer from "./column/gallery";
import {getCategory,getStyleCode} from "../../../../slice/allProducts/TravisMethewSlice"

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19','SS20	' ];
const OPTIONS2 = ['1MR410', '1MO479','1MR410',];


 const TravisTable = () => {
  const placement: SelectCommonPlacement = 'topLeft'; 
   const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
     const navigate = useNavigate()
    const dispatch= useDispatch()
    const searchInput = useRef<InputRef>(null);
   const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
     const[amount, setAmount]=useState<number>()
     

     const [selectedItems, setSelectedItems] = useState<string[]>([]);

    

     const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
     
       const [isCard, setIsCard]= useState<boolean>(true)
    //console.log(" travis Product",getProduct)

 
   const getStyleCodes= useSelector(getStyleCode)
    const getCategorys= useSelector(getCategory);
    const filteredOptions = getCategorys.filter((o) => !selectedItems.includes(o));
    const filteredOptionsTwo = getStyleCodes.filter((o) => !selectedItems.includes(o));
    const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "Gallery",
          // fixed: "left",
          width: 50,
          render: (value) => <ImageRenderer value={value} />,

        },

       
    
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 100,
          fixed: "left",
          
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div  style={{ padding: 8, position: "absolute", top: -90, backgroundColor: "white", zIndex: 1 }}>
              <Input
                ref={searchInput}

                placeholder="Search SKU"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onKeyUp={(e) => {
                  confirm({ closeDropdown: false });
                  
                }}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                setTimeout(() => searchInput.current?.select(), 1000);
              });
            }
          },
          onFilter: (value, record) => {
             
              let check: boolean= false
            const val:string=value.toString().toUpperCase()
              if(record && record.SKU){
                 check= record.SKU?.startsWith(val)
              }
           
            return  check;
          },
          filterSearch: true,

         
        },

        {
          title: "Description ",
          dataIndex: "Description",
          key: "Description", 
          width: 150,
         
        },

        
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 90 ,
           fixed: "left",
           filterMode: 'tree',
           filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Search Name"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const name =
              record &&
              record.Name;
             
          
            return  name=== value;
          },
          filterSearch: true,

        },
    
        
        
        {
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Category", 
          width: 110,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
            const categoryB = b.TravisAttributes?.[0]?.Category ?? "";
        
            return categoryA.localeCompare(categoryB);
          },
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
              >
                {/* Render options based on available categories */}
                {filteredOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
           
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const category =
              record &&
              record.TravisAttributes &&
              record.TravisAttributes[0].Category ;
              
             
           
            return  category=== value;
          },
          filterSearch: true,
        },
     
       


        {
          title: "Season",
          dataIndex: "TravisAttributes",
          key: "Season", 
          width: 100,
          render: (value) => <span>{value && value[0] && value[0].Season}</span>,
          sorter: (a, b) => {
            // Extract and compare Season values, handling null or undefined cases
            const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
            const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
            return seasonA.localeCompare(seasonB);
          },
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Season"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
              >
                {/* Render options based on available seasons */}
                {filteredOptionsOne.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
           
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const Season = record?.TravisAttributes?.[0]?.Season;
        

            return Season === value;
          },
          filterSearch: true,
        },



      {
        title: "Style",
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
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              mode="multiple"
              placeholder="Select Style"
              value={selectedKeys}
              onChange={setSelectedKeys}
              style={{ width: '100%' }}
              placement={placement} 
              onClick={(e) => {
                confirm({ closeDropdown: false });
                
              }}
            >
              {/* Render options based on available style codes */}
              {filteredOptionsTwo.map((item) => (
                <Select.Option key={item} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
           
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              // Trigger the search input to focus when the filter dropdown is opened
            });
          }
        },
        onFilter: (value, record) => {
          const StyleCode = record?.TravisAttributes?.[0]?.StyleCode;
      

          return StyleCode === value;
        },
        filterSearch: true,
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
          width: 65,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
       
      
        
           { title: "Qty88",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 150,
            fixed:'right',
            render: (value,record) => (
              <Tooltip  open={record.SKU=== qty88ToolSKU ?isQty88ToolTip:false} title={record.SKU=== qty88ToolSKU ? qty88ToolMesage : ""} placement="top">
              <InputNumber
              
              className='mx-3 number-input'
              addonBefore={value[0]?.Stock88} 
              value={record.Quantity88?.toString()}
              style={{ width: 100 }}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity88(value, record)
                }

              }}
             
               
              disabled={value[0]?.Stock90 === 0} 
            />
            </Tooltip>
             
            ),
          },
            {
              title: "Qty90",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 150,
            fixed:'right',
            render: (value,record) => (
              // <Input addonBefore={value[0]?.Stock90||0} 
              // type='number'
              
              // value={record.Quantity90?.toString()}
              // onChange={(e) => handleQuantity90(e.target.value, record)} 
              // disabled={value[0]?.Stock90 === 0} 
              // />
              <Tooltip  open={record.SKU=== qty90ToolSKU ?isQty90ToolTip:false} title={record.SKU=== qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
              <InputNumber
              className='mx-5 number-input'
              addonBefore={value[0]?.Stock90||0} 
              value={record.Quantity90?.toString()}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity90(value, record)
                }

              }}
               
              disabled={value[0]?.Stock90 === 0} 
              style={{ width: 100 }}
            />
            </Tooltip>
             
            ),
            },
           
        
        {
          title: "Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 50,
          fixed:'right'
        },


        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP", 
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


      //get other product 
      const getOtherProduct= useSelector(getOtherProducts)
      const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);

      const handleExpand = (expanded: boolean, record: BasicModelTravis) => {
         
          dispatch(removeOtherProduct())
        if (record && record.products && record.products.data) {
          // eslint-disable-next-line no-debugger
          debugger
          const sdd:BasicModelTravisGraph[]=record.products.data
          const recordedData:BasicModelTravis[]=[];
          getProduct.map((item)=>{
            sdd.map((product:BasicModelTravisGraph)=>{
              if(product && product.attributes){
                if(product.attributes.SKU === item.SKU){
                  recordedData.push(item)
                }
              }
            })


          })
          // Expand only the clicked row
          
          setExpandedRowKeys(recordedData);
          dispatch(addOtherProduct(recordedData))
         // expandedRowRender (record.products.data)  // Assuming SKU is a string
        } else{
          setExpandedRowKeys([])
        }
      };


      const expandedRowRender = (record: BasicModelTravis) => {
       

        if (record && record.products && record.products.data  &&record.products.data.length > 0) {
         
        const subcolumns: TableColumnsType<BasicModelTravis> = [

          {
            title: "SKU",
            dataIndex: "SKU",
            key: "SKU",
            width: 130,
            fixed: "left",
          }
          ,
          
           
            {
              title: "Style",
              dataIndex: "TravisAttributes",
              key: "StyleCode", 
              width: 85,
              render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
        },
            {
              title: "Size",
              dataIndex: "TravisAttributes",
              key: "Size", 
              width: 85,
              render: (value) => <span>{value && value[0] && value[0].Size}</span>,
        },
        
         
        { title: "Qty88",
        dataIndex: "TravisAttributes",
        key: "Stock88", 
        width: 100,
        fixed:'right',
        render: (value,record) => (
          <Tooltip  open={record.SKU=== qty881ToolSKU ?isQty881ToolTip:false} title={record.SKU=== qty881ToolSKU ? qty881ToolMesage : ""} placement="top">
          {/* <Input 
          addonBefore={value[0]?.Stock88} 
          type='number'
         
          value={record.Quantity88?.toString()}
          onChange={(e) => handleQuantity881(e.target.value, record)}
          disabled={value[0]?.Stock88 === 0} 
          /> */}
           <InputNumber
              
              className='mx-3 number-input'
              addonBefore={value[0]?.Stock88} 
              value={record.Quantity88?.toString()}
              style={{ width: 100 }}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity881(value, record)
                }

              }}
             
               
              disabled={value[0]?.Stock90 === 0} 
            />
         </Tooltip>
        ),
      },
      {
        title: "Qty90",
      dataIndex: "TravisAttributes",
      key: "Stock88", 
      width: 100,
      fixed:'right',
      render: (value,record) => (
        <Tooltip  open={record.SKU=== qty901ToolSKU ?isQty901ToolTip:false} title={record.SKU=== qty901ToolSKU ? qty901ToolMesage : ""} placement="top">
        {/* <Input addonBefore={value[0]?.Stock90||0} 
        type='number'
        
        value={record.Quantity90?.toString()}
        onChange={(e) => handleQuantity901(e.target.value, record)} 
        disabled={value[0]?.Stock90 === 0} 
        /> */}

<InputNumber
              className='mx-5 number-input'
              addonBefore={value[0]?.Stock90||0} 
              value={record.Quantity90?.toString()}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity901(value, record)
                }

              }}
               
              disabled={value[0]?.Stock90 === 0} 
              style={{ width: 100 }}
            />
       </Tooltip>
      ),
      },
      {
        title: "Qty",
        dataIndex: "TotalQty",
        key: "TotalQty", 
        width: 50,
        fixed:'right'
      },
        
            {
              title: "MRP",
              dataIndex: "MRP",
              key: "MRP", 
              width: 80,
              fixed:'right',
            
            },
            {
              title: "Amount",
              dataIndex: "Amount",
              key: "Amount", 
              width: 100,
              fixed:'right'
            },
           
          ]
           
          if(expandedRowKeys && getOtherProduct){

          
            return (
        
 


      <Table  className='table-travis'
                columns={subcolumns}
                dataSource={getOtherProduct?.map((item)=>({...item,key:item.id}))}
                pagination={false}
                
                size="middle"
                
                rowSelection={{
                  onSelect:(record)=>{handleSelctRow(record)}
                }}
              />
       

           );
               
          }
          else
          return null
    
        }
      }
        const [selectedRowKeys,setSelectedRowKeys]= useState<BasicModelTravis[]>([]);
   
        const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {
        
          
          
          console.log("selectedRowKeys changed: ", newSelectedRowKeys);
          // Check if the record is selected by checking if its key is included in newSelectedRowKeys
          //const isSelected = newSelectedRowKeys.includes(record.SKU);
          // Update the selectedRowKeys state based on the toggle state
         // setSelectedRowKeys(isSelected ? [record.SKU] : []);
        };
      

        const [qty901ToolMesage, setQty901Message]= useState<string>("")
        const [qty901ToolSKU, setQty901SKU]= useState<string|undefined>("")
       const [isQty901ToolTip, setIsQty901ToolTip]= useState<boolean>(false)
  const handleQuantity901 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    setQty901Message("");
    setIsQty901ToolTip(false);
    setQty901SKU("")
    
    record.Quantity90=intValue;
    if(intValue>0 ){
      if ( record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
      
        // Dispatch an action to update the quantity for the SKU
        
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
          
        }));
      
        dispatch(addTravisOrder({
          travisOrder:record,
          qty90: intValue,
          qty88:record.Quantity88
        }))

        // update other product
        dispatch(updateOtherQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
        }))
      
     
      }
      else{
        const st90=(record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 )? record.TravisAttributes[0].Stock90:0;
        setQty901Message("The quantity should not exceed the available stock")
        setIsQty901ToolTip(true)
        setQty901SKU(record.SKU)
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: st90,
        
         
        }));
        
      }
    }else if(intValue<0){
      
      setQty901Message("Quantity cannot be negative")
      setIsQty901ToolTip(true)
      setQty901SKU(record.SKU)
      
    }  else if(intValue===0){
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.MRP,
        
      }));

      dispatch(removeTravisOrder({
        travisOrder:record,
          qty90s: intValue,
          qty88s:record.Quantity90
          
      }))
    }

    

  
    // Log the record for debugging or tracking purposes
   
  };

  const [qty90ToolMesage, setQty90Message]= useState<string>("")
   const [qty90ToolSKU, setQty90SKU]= useState<string|undefined>("")
  const [isQty90ToolTip, setIsQty90ToolTip]= useState<boolean>(false)
  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    setQty90Message("");
    setIsQty90ToolTip(false);
    setQty90SKU("")
    record.Quantity90=intValue;
    if(intValue>0 ){
      if ( record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
      
        // Dispatch an action to update the quantity for the SKU
        
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
          
        }));
      
        dispatch(addTravisOrder({
          travisOrder:record,
          qty90: intValue,
          qty88:record.Quantity88
        }))
      }
      else{
        // alert("Quantity is not available")
        const st90=(record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 )? record.TravisAttributes[0].Stock90:0;
        setQty90Message("The quantity should not exceed the available stock")
        setIsQty90ToolTip(true)
        setQty90SKU(record.SKU)
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: st90,
        
         
        }));
        
    
        
      }
    }else if(intValue<0){
      
      // alert("Quantity cannot be negative")
      setQty90Message("Quantity cannot be negative")
    setIsQty90ToolTip(true)
    setQty90SKU(record.SKU)
    console.log("Quantity cannot be negative")
    }  else if(intValue===0){
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.MRP,
        
      }));

      dispatch(removeTravisOrder({
        travisOrder:record,
          qty90s: intValue,
          qty88s:record.Quantity90
          
      }))
    }

    // Log the record for debugging or tracking purposes
   
  };
   const [qty88ToolMesage, setQty88Message]= useState<string>("")
   const [qty88ToolSKU, setQty88SKU]= useState<string|undefined>("")
  const [isQty88ToolTip, setIsQty88ToolTip]= useState<boolean>(false)
  const handleQuantity88 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    setQty88Message("");
    setIsQty88ToolTip(false);
    setQty88SKU("")
    if(intValue>0 ){

    if ( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {
      

      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        MRP: record.MRP,
      }));
      record.Quantity88=intValue;
     // setQuantity88(intValue)
     dispatch(addTravisOrder({
      travisOrder:record,
        qty88: intValue,
        qty90:record.Quantity90
        
    }))
    }
    else if( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88&& record?.TravisAttributes[0].Stock88 < intValue &&intValue!==0){
     // alert("Quantity is not available")
      setQty88Message("The quantity should not exceed the available stock")
      setIsQty88ToolTip(true)
      setQty88SKU(record.SKU)
     dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: record.TravisAttributes[0].Stock88,
    }));

   
    }
  } else if(intValue<0){
    // alert("Quantity cannot be negative")
    setQty88Message("Quantity cannot be negative")
    setIsQty88ToolTip(true)
    setQty88SKU(record.SKU)
    console.log("Quantity cannot be negative")
  } else if(intValue===0){
    dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    dispatch(removeTravisOrder({
      travisOrder:record,
        qty88s: intValue,
        qty90s:record.Quantity90
        
    }))
    
  }
  
  };

  const [qty881ToolMesage, setQty881Message]= useState<string>("")
   const [qty881ToolSKU, setQty881SKU]= useState<string|undefined>("")
  const [isQty881ToolTip, setIsQty881ToolTip]= useState<boolean>(false)
  const handleQuantity881 = (value: string, record: BasicModelTravis) => {
    setQty881Message("");
    setIsQty881ToolTip(false);
    setQty881SKU("")
    const intValue = parseInt(value, 10);
    if(intValue>0 ){

    if ( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {
  

      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        MRP: record.MRP,
      }));
      record.Quantity88=intValue;
     // setQuantity88(intValue)
     dispatch(addTravisOrder({
      travisOrder:record,
        qty88: intValue,
        qty90:record.Quantity90
        
    }))
    dispatch(updateOtherQuantity88({
      sku: record.SKU,
      qty88: intValue,
      MRP: record.MRP,
    }))
    }
    else if( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88&& record?.TravisAttributes[0].Stock88 < intValue &&intValue!==0){
      //alert("Quantity is not available")
      setQty881Message("The quantity should not exceed the available stock")
      setIsQty881ToolTip(true)
      setQty881SKU(record.SKU)
     dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: record.TravisAttributes[0].Stock88,
    }));

    }
  } else if(intValue<0){
    setQty881Message("Quantity cannot be negative")
    setIsQty881ToolTip(true)
    setQty881SKU(record.SKU)
   
  } else if(intValue===0){
    dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    dispatch(removeTravisOrder({
      travisOrder:record,
        qty88s: intValue,
        qty90s:record.Quantity90
        
    }))
    
  }
  
  };
      // sample xls
  const[isSample, setIsSample]=useState<boolean>(false)
  const handleSampleExcel=()=>{
    setIsSample(true)
  }


  
  const handleResetIsSample=()=>{
    setIsSample(false)
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };
  const handleCloseImport = () => {
    setIsImport(false);
  };

  const [allXlxData, setAllXlxData]=useState<ExcelModelTravis[]>([])
const handleTravisData=(allDatat:ExcelModelTravis[])=>{
  const table = tableRef.current;
  handleCloseImport()
  
  setAllXlxData(allDatat)
}

//reset excel datta
const handleResetXlData=()=>{
  setAllXlxData([])
}

//exportto excel
const handleExportToExcel = () => {
  try {
   

    const table = tableRef.current as HTMLTableElement | null;

    if (!table) {
      console.error("Table element not found.");
      return;
    }

    // Get the table's outerHTML
    const tableHtml = table.outerHTML;

    // Create a Blob object representing the data as an XLSX file
    const blob = new Blob([tableHtml], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create a temporary anchor element to download the Blob
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
    anchor.click();

    // Release the object URL
    URL.revokeObjectURL(url);

  
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};


//handle Show Order

const handleShowOrder=()=>{

}



const [selectedRow, setSelectedRow]= useState<BasicModelTravis[]>([])
const handleSelctRow = (record: BasicModelTravis) => {
  console.log("record", record);
    if(selectedRow &&selectedRow.length>0){
      const updatedSelectedRow = [...selectedRow];
     const index= selectedRow.findIndex(row=> row.SKU===record.SKU);
     if(index!==-1){
      updatedSelectedRow.splice(index,1);
      setSelectedRow(updatedSelectedRow);

     }else if(index ===-1){
      setSelectedRowKeys([record]);
      if (record) {
        setSelectedRow(prev => [...prev, record]);
      }
     }
    } else {
      setSelectedRowKeys([record]);
      if (record) {
        setSelectedRow(prev => [...prev, record]);
      }
    }
  
};

// export to pdf 
const [isPDF, setIspdf]= useState<boolean>(false)
useEffect(()=>{
  if(selectedRow){
    console.log("selectedrow",selectedRow)
  }
},[selectedRow])

const handleExportToPDF=()=>{
  setIspdf(true)
  //setIsCard(false)
  
}

const handleResetSelectedRow =()=>{
  setSelectedRowKeys([]);
  setSelectedRow([])
  setIspdf(false)
 // setIsCard(true)
}


// view cart
const handleViewCard =()=>{
  navigate("/cart")
}
return (
    <div className='container'>

{isCard &&<Card className='travish-mat-section'  style={{ marginTop:'80px',padding:"10px",}}
           title="TRAVIS MATHEW"
           extra={
             <div >
               <Breadcrumb separator=">">
                 <Breadcrumb.Item>
                   <span className="gx-link">Home</span>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item>   
                   <span className="gx-link">Products</span>
                 </Breadcrumb.Item>
                 <Breadcrumb.Item>Travis Mathew</Breadcrumb.Item>
               </Breadcrumb>
             </div>
           }
         
        >
          
          <div style={{ float: "right",marginBottom:"12px" }}>
            <Button className='mx-3' 
           onClick={handleViewCard}
            >View cart</Button>

            <Button className='mx-3'
            onClick={handleImport}
            >Import Products</Button>
            <Button  className='mx-3'
            onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button  className='mx-3'
           onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button className='mx-3'
             onClick={handleSampleExcel}
             >Sample Excel</Button>
          </div>


          <Table className='card-table-travis'
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item?.SKU }))}
            rowSelection={{
              onSelect:(record)=>{handleSelctRow(record)}
            }}
            expandable={{ expandedRowRender,
           onExpand: (expanded, record) => handleExpand(expanded, record),
              
             }}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />

          

       
        </Card>}
       

        <SampleExcelTravis 
         isSample={isSample}
        resetIsSample={handleResetIsSample}
        />

        <TravisImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleTravisData}
        />

       <TravisExcelUploadDB
       xlData={allXlxData}
       resetXls={handleResetXlData}
       />

             { isPDF &&<TravisPdf
              selectedRow={selectedRow}
              resetSelectedRow={handleResetSelectedRow}
              />}
    </div>
  )
}

export default TravisTable