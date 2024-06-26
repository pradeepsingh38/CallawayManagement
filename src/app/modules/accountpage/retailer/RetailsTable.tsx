import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from 'antd';
import { KTIcon } from '../../../../_metronic/helpers';
import ImportRetailerModal from './importRetailer/ImportRetailerModal';
import Retailerheader from './Retailerheader';
import { getRetailers } from '../../../slice/retailer/RetailerSlice';
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import FromRetail from './FromRetail';
import Loading from '../../loading/Loading';

type Props = {
  className: string;
};

const RetailsTable = () => {
  const dispatch = useDispatch();
  const getRetailer = useSelector(getRetailers);
  const [allRetailers, setRetailers] = useState<RetailerModel[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {

   console.log("getRetailer",getRetailer)
    if (getRetailer ) {
     
      setRetailers(getRetailer);
    }
  }, [getRetailer]);

 

  const handleCopy = (text: string, ) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => {
        setCopied(null);
      }, 2000); // Reset the state after 2 seconds
    });
  };

  const [updateReatiler, setUpdateRetailer] = useState<RetailerModel|null>();
  const [isEdit , setIsEdit]= useState<boolean>(false)
const handleEditRetailer=(data:RetailerModel)=>{
  setIsEdit(true)
  setUpdateRetailer(data)

}
const handleResetIsEdit=()=>{
  setIsEdit(false)
  setUpdateRetailer(null)
}

  return (<>
   <div className='container '>
      <div className='card'>
        <Retailerheader />
        <div className='card-body py-3'>
          <div className='table-responsive'>
           {allRetailers && allRetailers.length>0?
            (<table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='w-25px'>
                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        value='1'
                        data-kt-check='true'
                        data-kt-check-target='.widget-9-check'
                      />
                    </div>
                  </th>
                  <th className='min-w-100px'>Name</th>
                  <th className='min-w-120px'>GSTIN</th>
                  <th className='min-w-100px'>Address</th>
                  <th className='min-w-100px'>Manager Name</th>
                  <th className='min-w-100px'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allRetailers &&
                  allRetailers.length > 0 &&
                  allRetailers.map((item: RetailerModel) => {
                  

                    return (
                      <tr key={item.id}>
                        <td>
                          <div className='form-check form-check-sm form-check-custom form-check-solid'>
                            <input
                              className='form-check-input widget-9-check'
                              type='checkbox'
                              value='1'
                            />
                          </div>
                        </td>

                        
                        <td style={{ width: '300px' }}>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <a
                                href='#'
                                className='text-gray-900 fw-bold text-hover-primary fs-7'
                              >
                                {item?.name}
                              </a>
                              <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td style={{ width: '270px' }}>
                          <div
                            className='d-flex justify-content-start flex-column'
                            style={{ width: '270px' }}
                          >
                            <span className='text-gray-900 fw-bold text-hover-black fs-6'>
                              {item?.gstin}
                              <Tooltip title={copied === item?.gstin ? 'Copied!' : 'Copy'}>
                                <i
                                  className={`bi bi-copy ${copied === item?.gstin ? 'text-black' : 'text-gray-500'} text-hover-dark cursor-pointer mx-2`}
                                  onClick={() => handleCopy(item.gstin??"")} // Wrap handleCopy call in an arrow function
                                ></i>
                              </Tooltip>
                            </span>

                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                              {item.email}
                              <Tooltip title={copied === item.email ? 'Copied!' : 'Copy'}>
                                <i
                                  className={`bi bi-copy ${copied === item.email ? 'text-black' : 'text-gray-500'} text-hover-dark cursor-pointer mx-2`}
                                  onClick={() => handleCopy(item.email??"")} // Wrap handleCopy call in an arrow function
                                ></i>
                              </Tooltip>
                            </span>
                          </div>
                        </td>

                        

                        <td style={{ width: '380px' }}>
                          <span className='text-gray-900 fw-bold fs-7'>{item.address}</span>
                          <span className='text-muted fw-semibold text-muted d-block fs-7'></span>
                        </td>
                     
                        <td>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>

                              <span className='text-gray-900 me-2 fs-7 fw-semibold'>
                                {item.manager_name}
                              </span>

                            </div>
                          </div>
                        </td>
                        <td>
                          <div className='d-flex flex-shrink-0'>
                            <a
                             onClick={()=>handleEditRetailer(item)}
                             
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                               <KTIcon iconName='pencil' className='fs-3' />
                          
                            </a>
                            <a
                            
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            >
                              <KTIcon iconName='trash' className='fs-3' />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>):(
              <Loading/>
            )}
          </div>
        </div>
      </div>
    </div>
    {
      isEdit &&
      updateReatiler &&
      <FromRetail
      isEdit={isEdit}
      retailerupdate={updateReatiler}
      resetIsEdit={handleResetIsEdit}
      />

    }
  </>
   
  );
};

export default RetailsTable;
