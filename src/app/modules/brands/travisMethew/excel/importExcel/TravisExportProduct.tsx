import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import * as XLSX from "xlsx";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel"
import type { UploadChangeParam } from "antd/lib/upload";
import "./TravisExportProduct.css"

import jsPDF from "jspdf";
import "jspdf-autotable";


const { Dragger } = Upload;

type Props = {
  onClose: () => void;
  isProduct: boolean;
  printPdf: () => void;
  excelExport: () => void;
  allGoodsData: (allData: ExcelModelTravis[]) => void
  excelAllExport: () => void
  ppt:()=> void
  
}

const props: UploadProps = {
  name: 'file',
  multiple: false,


};
const TravisExportProduct = ({ onClose, isProduct, allGoodsData, printPdf, excelExport ,excelAllExport,ppt}: Props) => {
  const [allXlxData, setAllXlxData] = useState<ExcelModelTravis[]>([])
  const [loading, setLoading] = useState<boolean>(false);


  // handle input xls
 

  const handleOk = () => {
    //setIsModalOpen(false);
    allGoodsData(allXlxData)
    // onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };

  const handlePdf = () => {
    printPdf()
  }

  const handleExcel = () => {
    excelExport()
  }

  const handleExportAll =() =>{
    excelAllExport()
  }

 

const handlePPT=()=>{
  ppt()
}
  
  
  return (
    <div>
      <Modal
        // title="Basic Modal"
        className="export-product"
        open={isProduct}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Export  Products</h3>
        {/* <Dragger
          multiple={false}
          onChange={(info) => handleInput(info)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger> */}


        <div className="mt-5 downlaod-excel  py-4">
          <button className="export-button pdf hover-scale"
            onClick={handlePdf}
          > <i className="bi bi-file-pdf fs-2"></i>Export to PDF</button>

          <button className="export-button excel hover-scale"
            onClick={handleExcel}
          >
            <i className="bi bi-file-earmark-spreadsheet fs-2"></i>
            Export to Excel
        </button>
          <button className="export-button excel hover-scale"
            onClick={handlePPT}
          >
            <i className="bi bi-file-earmark-ppt fs-2"></i>
            Export to PPT 
        </button>

            <button className="export-button pro-btn-table hover-scale"
            // onClick={handlePdf}
             onClick={handleExportAll} 
          > 
          <i className="bi bi-file-earmark-arrow-up fs-2"></i>Export  ALL</button>
          
        </div>
      </Modal>
    </div>
  )
}

export default TravisExportProduct;

