import React, { useEffect, useRef } from 'react';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { BrandModel } from "../../../model/brand/AllBrands"
import { getAllBrands } from "../../../../slice/brand/BrandSlice";
import { Link } from 'react-router-dom';
import "./TravisPdf.css"
type Props = {
  selectedRow: BasicModelTravis[];
  resetSelectedRow: () => void;
};

const TravisPdf: React.FC<Props> = ({ selectedRow, resetSelectedRow }: Props) => {

  const getAllBrand = useSelector(getAllBrands) as BrandModel[];
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => resetSelectedRow(),
    removeAfterPrint: true,

  });





  return (<div>
    <div className='pdf-info'>
      <Row >
        <Col xs={24} >
        <div style={{ textAlign: "left", marginTop: "40px", marginBottom:"6px" }}>
                      {/* <Button 
                        onClick={() => {
                          handlePrint(null, () => contentToPrint.current);
                        }}
                        >
                          
                        </Button> */}

                      <button onClick={() => {
                        handlePrint(null, () => contentToPrint.current);
                      }} type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 "><span>Download Pdf</span></button>

                      {/* <Button 
                        onClick={handleExportToPPT}
                        >
                          
                        </Button> */}

                      <button type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 "><span>Download PPT</span></button>

                    </div>

          <Card id="catelog" ref={contentToPrint}>
            <div>
              <div>
                <div>

               

                  <div
                    style={{
                      paddingBottom: "100px",
                      textAlign: "center",
                    }}
                  >
                  

                    {getAllBrand &&
                      getAllBrand.length > 0 &&
                      getAllBrand.map((item: BrandModel) => {
                        if (item && item.attributes && item.attributes.Name === "Travis Mathew") {
                          return (
                            <div key={item.id}>
                              <div>
                                <img
                                  style={{ width: "300px", paddingTop: "80px" }}
                                  src={`https://admin.callawayindiaoms.com${item.attributes.Logo?.data?.attributes?.formats?.thumbnail?.url}`}
                                  alt="Callaway Logo"
                                />
                              </div>
                              <div>
                                <h2 style={{ paddingTop: "50px", paddingBottom: "10px", fontSize: "32px", color: "#262626", fontFamily: "'NoirPro',sans-serif", fontWeight: "500" }}>{item.attributes.Name}</h2>
                                <p style={{
                                  fontSize: "14px",
                                  paddingLeft: "20px",
                                  paddingRight: "20px",

                                }}>
                                  {item?.attributes?.Description}
                                </p>
                              </div>


                            </div>
                          );
                        }
                      })
                    }

                  </div>

                </div>

                {/* prodect two  start*/}
              </div>
            </div>

            {selectedRow &&
              selectedRow.length > 0 &&
              selectedRow.map(
                (callout) => (
                  <>
                    <div
                      style={{
                        borderBottom: "1px solid #ddd",
                        paddingTop: "10px",
                        paddingLeft: "50px",
                      }}
                    >
                      <div
                        className="prodect-pdf-section"
                        style={{ display: "flex", marginBottom:"60px", marginTop: "20px",}}
                      >
                        <div
                          className="gx-product-col gx-product-content1"
                          style={{ order: "0", width: "47%" }}
                        >
                          <h2 style={{
                            fontSize: "24px",
                            //fontweight: "500" 
                          }}>
                            <span> Name :</span> {callout?.Name}
                          </h2>
                          <p
                            style={{
                              fontSize: "14px",
                              paddingRight: "10px",
                            }}
                          >
                            <span> Description :</span> {callout?.Description}
                          </p>

                          <div>
                            <table
                              style={{
                                border: "1px solid #ddd",
                                width: "280px",
                                marginTop: "10px",
                                marginRight:"50px"
                              }}
                            >
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <th
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    fontFamily: "'NoirPro',sans-serif",
                                    fontSize: " 16px",
                                    fontWeight: "500",
                                    textAlign: "left",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  SKU
                                </th>
                                <th
                                  style={{
                                    fontFamily: "'NoirPro',sans-serif",
                                    fontSize: " 16px",
                                    fontWeight: "500",
                                    textAlign: "left",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {" "}
                                  {callout?.SKU}
                                </th>
                              </tr>
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Category
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout.TravisAttributes[0].Category}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Season
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout.TravisAttributes[0].Season}{" "}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Color
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout.TravisAttributes[0].Color}
                                </td>
                              </tr>
                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Style Code
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout?.TravisAttributes[0]?.StyleCode}
                                </td>
                              </tr>

                              <tr
                                style={{
                                  border: "1px solid #ddd",
                                  lineHeight: "40px",
                                }}
                              >
                                <td
                                  style={{
                                    borderRight: "1px solid #ddd",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  Color
                                </td>
                                <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout?.TravisAttributes[0]?.Color}
                                </td>
                              </tr>
                            </table>
                          </div>
                        </div>

                        <div style={{ width: "45%", borderRadius: "5px", display:"flex" }}>
                          <div className='prodect-images'>
                          <img
                            alt="Special Edition Party Spas"
                            style={{
                              backgroundColor: "#eee",
                              borderRadius: "10px",
                              width: "225px"
                            }}
                            src={`https://admin.callawayindiaoms.com/uploads/large_51xntqlp_Sy_L_AC_SL_1500_a17350c6f1_d08da64450.jpg`}
                          />
                   </div>

                          <div
                            className="prodect-info-img">
                            {callout?.Gallery &&
                              callout?.Gallery.data.length > 0 &&
                              callout?.Gallery.data.map((item) => (
                                <>
                                  <div
                                    className="prodect-images-pdf"
                                    style={{ marginRight: "10px" }}
                                  >
                                    <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={`https://admin.callawayindiaoms.com${item?.attributes?.formats?.medium?.url}`}
                                      />
                                    </span>
                                  </div>
                                </>
                              ))}
                          </div>


                        </div>
                      </div>




                    </div>
                  </>
                )
              )}
          </Card>
        </Col>
      </Row>
    </div>

  </div>);
};

export default TravisPdf;