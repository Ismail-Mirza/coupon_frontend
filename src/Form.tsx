import { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import useCouponStore from './store/useCoupon';
const presentDate = new Date();


const CouponForm = () => {
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [expirationHours, setExpirationHours] = useState('');
  const fetchCoupons = useCouponStore((state) => state.fetchCoupons);



  const handleSubmit = async (e:any) => {
    e.preventDefault();

    presentDate.setHours(presentDate.getHours() + parseInt(expirationHours));

    const couponData = {
      code:couponCode,
      discount:discountAmount,
      expirationDate: presentDate.toISOString(),
    };

    try {
      const response:AxiosResponse = await axios.post(import.meta.env.VITE_API_URL+'coupon/create/', couponData);

      if (response.status === 201) {

        fetchCoupons()

      }
      else
      {
        alert("Error in creating coupon " + response.status)
      }
      // Handle response as needed
      // ...
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '50px auto',
      }}
      onSubmit={handleSubmit}
    >
      <h5>Create a new coupon</h5>
      <label htmlFor="coupon-code" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Coupon Code:
      </label>
      <input
        type="text"
        id="coupon-code"
        name="coupon-code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />

      <label htmlFor="discount-amount" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Discount Amount:
      </label>
      <input
        type="number"
        id="discount-amount"
        name="discount-amount"
        value={discountAmount}
        onChange={(e) => setDiscountAmount(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />
       <label htmlFor="expiration-hours" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Expiration Time(hours):
      </label>
      <input
        type="number"
        id="expiration-hours"
        name="expiration-hours"
        value={expirationHours}
        onChange={(e) => setExpirationHours(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />

      <button
        type="submit"
        style={{
          padding: '8px 15px',
          backgroundColor: '#f2f2f2',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Create
      </button>
    </form>
  );
};
type couponUpdateFormType = {
    _id:any,
    code:string,
    discount:number,
    expirationDate:Date,
    setHide: (bol:boolean) => void

}
const CouponUpdateForm = ({
    _id,
    code,
    discount,
    setHide,
    expirationDate,
}:couponUpdateFormType) => {

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');
  const [expirationHours, setExpirationHours] = useState('');
  const fetchCoupons = useCouponStore((state) => state.fetchCoupons);

  useEffect(()=>{
    setCouponCode(code);
    setDiscountAmount(String(discount));
    //@ts-ignore  
    setExpirationHours(String(Math.floor(Math.abs(new Date(expirationDate) - presentDate)/36e5)));
    
  },[code,discount,expirationDate])

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    presentDate.setHours(presentDate.getHours() + parseInt(expirationHours));

    const couponData = {
      code:couponCode,
      discount:discountAmount,
      expirationDate: presentDate.toISOString(),
    };

    try {
      const response:AxiosResponse = await axios.put(`${import.meta.env.VITE_API_URL}coupon/update/${_id}/`, couponData);

      if (response.status === 201) {

        fetchCoupons()
      }
      else
      {
        alert("Error in creating coupon " + response.status)
      }
      // Handle response as needed
      // ...
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '50px auto',
      }}
      onSubmit={handleSubmit}
    >
      <h5>Update Form for -{code}</h5>
      <label htmlFor="coupon-code" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Coupon Code:
      </label>
      <input
        type="text"
        id="coupon-code"
        name="coupon-code"
        value={couponCode }
        onChange={(e) => setCouponCode(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />

      <label htmlFor="discount-amount" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Discount Amount:
      </label>
      <input
        type="number"
        id="discount-amount"
        name="discount-amount"
        value={discountAmount}
        onChange={(e) => setDiscountAmount(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />
       <label htmlFor="expiration-hours" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Expiration Time(hours):
      </label>
      <input
        type="number"
        id="expiration-hours"
        name="expiration-hours"
        value={expirationHours}
        onChange={(e) => setExpirationHours(e.target.value)}
        required
        style={{ padding: '5px', marginBottom: '10px', border: '1px solid #ddd' }}
      />

      <button
        type="submit"
        style={{
          padding: '8px 15px',
          backgroundColor: '#f2f2f2',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Update
      </button>
      <button
        type="button"
        onClick={()=>setHide(false)}
        style={{
          padding: '8px 15px',
          backgroundColor: '#f2f2f2',
          border: 'none',
          cursor: 'pointer',
          marginTop:'20px'
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default CouponForm;
export {
    CouponUpdateForm
};
