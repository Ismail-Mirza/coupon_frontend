import create,{SetState} from 'zustand';


type Coupon ={
    _id: any;
    code:string;
    discount:number;
    expirationDate:Date;
}

type CouponSate ={
    coupons: Coupon[],
    fetchCoupons: ()=>Promise<void>;
}
const useCouponStore = create<CouponSate>((set:SetState<CouponSate>):CouponSate => ({
  coupons: [],
  fetchCoupons: async() => {
    console.log(import.meta.env)
    try {
      
      const response = await fetch(import.meta.env.VITE_API_URL+'coupon/get-all/');
      const data = await response.json();
      set({ coupons: data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useCouponStore;
