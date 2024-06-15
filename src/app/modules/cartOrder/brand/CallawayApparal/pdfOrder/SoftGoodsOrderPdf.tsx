import React, { useEffect, useRef, useState } from 'react'
import { getCurrentUser, getUserProfile } from '../../../../../slice/UserSlice/UserSlice'
import { useSelector } from 'react-redux'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel'
import { getApparelProducts, getSoftgoodRetailerDetail } from '../../../../../slice/allProducts/CallawayApparelSlice'
import { Button, Card, Table, type TableColumnsType } from 'antd';
import { useReactToPrint } from 'react-to-print'
import { RetailerModel } from '../../../../model/AccountType/retailer/RetailerModel'
//import BrandLogo from "../../../../../../public/media/logos/logo-white.png"
const SoftGoodsOrderPdf = () => {

  const today = new Date();
  //const formattedDate = today.toLocaleDateString('en-CA'); 
  const formattedDate = today.toLocaleDateString('en-GB');

  const getCurrentUsers = useSelector(getCurrentUser)
  const [salesRepName, setSalesRepName] = useState<string>()
  const getUserProfiles = useSelector(getUserProfile)
  //get sales Rep name
  useEffect(() => {
    if (getUserProfiles && getUserProfiles.length > 0) {
      getUserProfiles.map(item => {
        if (item.role === "Sales Representative") {
          setSalesRepName(item.name)
        }
      })
    }
  }, [getUserProfiles])

  // get all discount , net billl amount
  const getSoftGoodsRetailerDetails = useSelector(getSoftgoodRetailerDetail) as RetailerModel;
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  const getSoftGoodsProduct: BasicModelApparel[] = useSelector(getApparelProducts)
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelApparel[]>([])
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    const travis: BasicModelApparel[] = [];
    if (getSoftGoodsProduct && getSoftGoodsProduct.length > 0) {
      getSoftGoodsProduct.map((item) => {
        if (item.ordered) {
          travis.push(item)
        }
        if (item.Amount) {

          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue) {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }
      })


      setGetAllTravisOrders(travis)
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(parseFloat((tAmount - totalBillAmount).toFixed(2)));
    }
  }, [getSoftGoodsProduct]);

  const columns: TableColumnsType<BasicModelApparel> = [

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,

    },
    // {
    //     title: "Category",
    //     dataIndex: "category",
    //     key: "category",
    //     width: 120,



    //   },


    // {
    //     title: "Season",
    //     dataIndex: "season",
    //     key: "season",
    //     width: 100,


    //   },





    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 85,

    },
    {
      title: "Style",
      dataIndex: "style_id",
      key: "style_id",
      width: 85,

    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 85,

    },
    //   {
    //     title: "Gender",
    //     dataIndex: "gender",
    //     key: "gender",
    //     width: 85,

    //   },	
    //   {
    //     title: "Sleeves",
    //     dataIndex: "sleeves",
    //     key: "sleeves",
    //     width: 85,

    //   },	


    {
      title: " Qty",
      dataIndex: "TotalQty",
      key: "TotalQty",
      width: 150,
      fixed: 'right',





    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      width: 100,
      fixed: 'right'

    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 70,
      fixed: 'right'

    },
    // {
    //     title: "GST",
    //     dataIndex: "GST",
    //     key: "GST",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "LessGST",
    //     dataIndex:"LessGST",
    //     key:"LessGST",
    //     width: 70,
    //     fixed: 'right'

    //   },

    //   {
    //     title: "Discount",
    //     dataIndex:"Discount",
    //     key:"Discount",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "LessDiscountAmount",
    //     dataIndex:"LessDiscountAmount",
    //     key:"LessDiscountAmount",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "NetBillings",
    //     dataIndex:"NetBillings",
    //     key:"NetBillings",
    //     width: 70,
    //     fixed: 'right'

    //   },
    //   {
    //     title: "FinalBillValue",
    //     dataIndex:"FinalBillValue",
    //     key:"FinalBillValue",
    //     width: 70,
    //     fixed: 'right'

    //   },


  ];

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing .."),


  });

  return (
    <div>
      <Button className="mt-12"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}

      >Download PDF</Button>

      <Card className="padf" style={{ marginTop: "10px", backgroundColor: "#f8f8f8" }}>

        <div className=" ant-card ant-card-bordered gx-card mt-6" ref={contentToPrint}>
          <div className="ant-card-body">

            <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
              <div className="col-7 text-end ">
                {/* <img className="pdf-image" width={200} src={BrandLogo}></img> */}
              </div>
              <div className="col-5 text-end px-6">
                <h2 className="text-white pdf-title">ORDER PDF</h2>
              </div>
            </div>


            <div className="row px-10 mt-8 mb-18" >
              <div className="col-8">
                <h1 className=" d-flex font-gray-900 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >{getSoftGoodsRetailerDetails.name}</h1>

                <div className="d-flex">
                  <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
                  <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> {getSoftGoodsRetailerDetails.gstin} <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
                </div>

                <div className="user-address pt-3">
                  <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
                  <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mb-3">
                    {getSoftGoodsRetailerDetails.address}
                  </p>
                </div>

                {/* <div className="user-address  d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
             </span>

            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
           {getTravisRetailerDetails.phone}

            </p>
          </div> */}


              </div>



              <div className="col-4 user-details-pdf" >
                <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Date:</span> {formattedDate} </p>

                <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Company:</span> Callaway Golf India</p>

                <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Brand:</span>Callaway</p>
                <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Manager:</span> {getCurrentUsers?.name}</p>
                <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Sales Rep:</span>  {salesRepName}</p>
              </div>
            </div>




            <Table
              className='cart-table-profile project-table-profile mx-7'

              style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

              columns={columns}
              dataSource={allTravisOrders?.map((item) => ({ ...item, key: item.sku }))}

              size="middle"
              pagination={false} />


            <div className='row'>
              <div className='col-3 mt-6 notes-pdf'>
                <h2 className='fs-4'>NOTES:</h2>
                <h4 className='fs-5 text-gray-700 notes-pdf-text'>- This is note one</h4>
                <h4 className='fs-5 text-gray-700 notes-pdf-text'>- This is note two</h4>

              </div>
              <div className='col-9'>
                <div className="mx-7" style={{ width: "237px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>

                  <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                    {" "}
                    <a style={{ color: "#545454", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a>₹{totalAmount}
                  </h4>
                  {/* ₹ */}
                  <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                    {" "}
                    <a style={{ color: "#545454", paddingRight: "90px", paddingLeft: "10px", }}>Discount:</a> ₹{discountAmount}
                  </h4>



                  {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
              {" "}
              <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
            </h4> */}



                  <h4 style={{ color: "#545454", padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px", display: "flex" }}>
                    <a style={{ color: "#545454", paddingRight: "109px", paddingLeft: "10px", }}>Total : </a>₹{totalNetBillAmount}
                  </h4>
                </div>
              </div>

            </div>

          </div>

        </div>

      </Card>

    </div>
  )
}

export default SoftGoodsOrderPdf