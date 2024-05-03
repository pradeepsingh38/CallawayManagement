import {useIntl} from 'react-intl'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget5,
  ListsWidget6,
  MixedWidget10,
  MixedWidget11,
  MixedWidget2,

  MixedWidget8,
  TablesWidget10,
  TilesWidget1,
  TilesWidget2,
  TilesWidget3,
  TilesWidget4,
  TilesWidget5,


} from '../../../_metronic/partials/widgets'
import { TilesWidget7 } from '../../../_metronic/partials/widgets/tiles/TilesWidget7.tsx'
import { TilesWidget8 } from '../../../_metronic/partials/widgets/tiles/TilesWidget8.tsx'
import { TilesWidget6 } from '../../../_metronic/partials/widgets/tiles/TilesWidget6.tsx'
import { MixedWidget16 } from '../../../_metronic/partials/widgets/mixed/MixedWidget16.tsx'
import { MixedWidget17 } from '../../../_metronic/partials/widgets/mixed/MixedWidget17.tsx'
import { MixedWidget18 } from '../../../_metronic/partials/widgets/mixed/MixedWidget18.tsx'
import { Toolbar } from '../../../_metronic/layout/components/toolbar/Toolbar'
import { Content } from '../../../_metronic/layout/components/Content'
import { useEffect } from 'react'
import GetAllProduct from '../../api/allProduct/GetAllProduct';
import Loading from '../../modules/loading/Loading'
import {getLoading,LoadingStop} from "../../slice/loading/LoadingSlice"
import {useSelector, useDispatch} from "react-redux";

import {getTravisProducts} from "../../slice/allProducts/TravisMethewSlice.tsx"
import {getOgioProducts} from "../../slice/allProducts/OgioSlice.tsx"
import {getAllBrands} from "../../slice/brand/BrandSlice.tsx"
import {BrandModel} from "../../modules/model/brand/AllBrands.ts"
const DashboardPage = () => (

  
  <>
    <Toolbar />
    <Content>
      <div className='row g-5 g-xl-8'>

      <div className='col-xl-4'>
              <TilesWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
              <div className='row gx-5 gx-xl-8'>
                <div className='col-xl-6'>

                  <TilesWidget5
                    className='card-xxl-stretch bg-primary'
                    svgIcon='element-11'
                    titleClass='text-white'
                    descriptionClass='text-white'
                    iconClass='text-white'
                    title='790'
                    description='New Products'
                  />
                </div>

                <div className='col-xl-6'>
                  <TilesWidget6
                    className='card-xxl-stretch bg-body'
                    svgIcon='rocket'
                    titleClass='text-gray-900'
                    descriptionClass='text-muted'
                    iconClass='text-success'
                    title='8,600'
                    description='New Customers'
                  />
                </div>


                <div className='col-xl-6 mt-3'>
                  <TilesWidget7
                    className='card-xxl-stretch  bg-body'
                    svgIcon='element-11'
                    titleClass='text-gray-900'
                    descriptionClass='text-muted'
                    iconClass='text-white'
                    title='790'
                    description='New Products'
                  />
                </div>
                <div className='col-xl-6 mt-3'>
                  <TilesWidget8
                    className='card-xxl-stretch '
                    svgIcon='element-11'
                    titleClass='text-gray-900'
                    descriptionClass='text-muted'
                    iconClass='text-white'
                    title='790'
                    description='New Products'
                  />
                </div>

               
              </div>
            </div>

            <div className='col-xl-4'>
            <MixedWidget2
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
          />
        </div>


        <div className='col-xl-4'>
        <MixedWidget16
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
          />
        </div>

       



      
      </div>

   

      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
   
        <div className='col-xxl-4'>
          <MixedWidget17
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
          />
        </div>

        <div className='col-xxl-4'>
        <MixedWidget18
            className='card-xl-stretch mb-xl-8'
            chartColor='danger'
            chartHeight='200px'
            strokeColor='#cb1e46'
          />
        </div>

        <div className='col-xxl-4'>
        <MixedWidget8
            className='card-xxl-stretch mb-xl-3'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
     
      

      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8'>
      <div className='col-xl-4'>
          
      <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
       </div>
        <div className='col-xl-8'>
          
           <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> 
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-xl-4'>
        <ListsWidget5 className='card-xxl-stretch' />
      
        </div>
        <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
         
        </div>
         <div className='col-xl-4'>
         <ListsWidget6 className='card-xl-stretch mb-xl-8' /> 
          {/* <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} /> */}
        </div> 
        

     
      </div>
      {/* end::Row */}
    </Content>
  </>
)

const DashboardWrapper = () => {
  useEffect(()=>{},[])
  const intl = useIntl()
 const dispatch= useDispatch()
  const getLoadings=useSelector(getLoading)
  console.log("loading ",getLoadings)
  const getTravisProduct= useSelector(getTravisProducts)
  const getOgioProduct= useSelector(getOgioProducts)
  const getAllBrand = useSelector(getAllBrands) as BrandModel[];

  useEffect(()=>{
    if(getTravisProduct && getTravisProduct.length>0 &&
      
      getOgioProduct && getOgioProduct.length>0  &&
       getAllBrand && getAllBrand.length>0
    ){
      dispatch(LoadingStop ())
    }
  },[getTravisProduct,getOgioProduct,getAllBrand])

  
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      
      {getLoadings &&<Loading/>}
      <DashboardPage />
      {/* <GetAllProduct/> */}

     
    </>
  )
}

export {DashboardWrapper}
