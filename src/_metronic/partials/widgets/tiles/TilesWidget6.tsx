
import clsx from 'clsx'
import {KTIcon} from '../../../helpers'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getGoodsProducts } from '../../../../app/slice/allProducts/CallAwayGoodsSlice'
type Props = {
  className?: string
  svgIcon?: string
  titleClass?: string
  descriptionClass?: string
  iconClass?: string
  title?: string
  description?: string
}
const TilesWidget6 = (props: Props) => {
  

  const getGoodsProduct= useSelector(getGoodsProducts)
  const {className, svgIcon, titleClass, descriptionClass, iconClass, title, description} = props
  return (
    
       <Link className ={clsx('card cart-brand-section', className)} to={"/brand/callaway/goods" }>
      <div className='card-body d-flex flex-column justify-content-between'>

        <img width={30} src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/icon_callway_f25555115b.png'></img>
        <div className='d-flex flex-column'>
          <div className={clsx(titleClass, 'fw-bold fs-1 mb-0 mt-5')}>{getGoodsProduct.length}</div>
          <div className={clsx(descriptionClass, 'fw-semibold fs-6')}>
Callaway Hardgoods</div>
        </div>
      </div>
   
      </Link>
  )
}

export {TilesWidget6}
