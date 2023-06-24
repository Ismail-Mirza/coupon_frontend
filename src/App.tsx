import  { useEffect, useState } from 'react';
import useCouponStore from './store/useCoupon';
import CouponForm,{CouponUpdateForm} from './Form';
import axios from 'axios';
import moment from 'moment'

const App=()=>{

  const coupons = useCouponStore((state) => state.coupons);
  const fetchCoupons = useCouponStore((state) => state.fetchCoupons);
  const [hide,setHide] = useState(false);
  const [coupon,setCoupon] = useState({});
  useEffect(()=>{
    fetchCoupons()
  },[fetchCoupons])
  const handleDelete = (id:string)=>{
axios.delete(import.meta.env.VITE_API_URL+'coupon/delete/'+id+'/')
.then(() => {
  fetchCoupons()
})
.catch(() => {
});
  }
  const handleUpdate =(coupon:any)=>
  {
     setHide(true);
     //@ts-ignore
      setCoupon(coupon);
  }
  return (
    <div className='main-container'>
      {
        //@ts-ignore
        hide?<CouponUpdateForm {...coupon} setHide={setHide}/>:(<CouponForm/>)
      }
     {coupons.length ===0 ?("No coupon found!"): (<table className='minimalist-table table'>
      <thead className='table-dark '>
        <tr>
          <td>
           Code
          </td>
          <td>
            Discount(tk)
          </td>
          <td>
            Expiration Date
          </td>
          <td>
            Delete
          </td>
          <td>
            Update
          </td>
        </tr>
      </thead>

      <tbody>
        {
          coupons.map((coupon) =>{
            return (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.discount}</td>
                <td>{moment(coupon.expirationDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td style={{'cursor':"pointer"}} onClick={()=>handleDelete(coupon._id)}>X</td>
                <td style={{'cursor':"pointer"}} onClick={()=>handleUpdate(coupon)}>Update</td>
              </tr>
            )
          })
        }
      </tbody>
      </table>)}
    </div>
  )
}

export default App
