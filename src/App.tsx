import  { useEffect, useState } from 'react';
import useCouponStore from './store/useCoupon';
import CouponForm,{CouponUpdateForm} from './Form';
import axios from 'axios';

const App=()=>{

  const coupons = useCouponStore((state) => state.coupons);
  const fetchCoupons = useCouponStore((state) => state.fetchCoupons);
  const [hide,setHide] = useState(false);
  const [body,setBody] = useState('');
  useEffect(()=>{
    fetchCoupons()
  },[fetchCoupons])
  const handleDelete = (id:string)=>{
    // Make a DELETE request
axios.delete(import.meta.env.VITE_API_URL+'coupon/delete/'+id+'/')
.then(() => {
  // Handle successful response
  // ...
  window.location.reload();
})
.catch(() => {
  // Handle error
  // ...
});

    

  }
  const handleUpdate =(coupon:any)=>
  {
     setHide(true);
     //@ts-ignore
      setBody(<CouponUpdateForm {...coupon} setHide={setHide}/>)
  }
  return (
    <div className='container'>
      {
        hide?(body):(<CouponForm/>)
      }
      <table className='minimalist-table'>
      <thead>
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
                <td>{String(coupon.expirationDate)}</td>
                <td style={{'cursor':"pointer"}} onClick={()=>handleDelete(coupon._id)}>X</td>
                <td style={{'cursor':"pointer"}} onClick={()=>handleUpdate(coupon)}>Update</td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
    </div>
  )
}

export default App
