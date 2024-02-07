import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "../components/CartItem";
import { createOrder,fetchProducts ,fetchOrders} from "../redux/features/actions/products";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

 const Checkout = () => {
  const { closeCart, cartItems } = useShoppingCart();
  const {products, loading, error} = useSelector((state:any) => state.products);

  const user = JSON.parse(localStorage.getItem('user') || '{}');


  const dispatch = useDispatch();
  if(cartItems.length === 0)  window.location.replace("/discover");

  useEffect(() => {
    if(!user.token)  window.location.replace("/login");
   
    dispatch(fetchProducts() as any);
 }

, [dispatch]);
 
  const handleOrder = async () => {

    const HOST: string = import.meta.env.VITE_BACKEND_URL;
    const data = {
      items: cartItems,
      amount: cartItems.reduce((total, CartItem) => {
        const item = products.find((i:any) => i.id === CartItem.id);
        return total + (item?.price || 0) * CartItem.quantity;
      }, 0),
    };

    const response = await fetch(`${HOST}/orders/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (response.status === 201) {
      return result;
    } else {
      return { error: result.error };
    }

  };

  return (
    <>
    <div className="p-4">
      <div className="min-h-screen ">
        <div className="container mx-auto p-10 max-w-screen-lg">
          <div className="bg-white rounded shadow p-8">
            {/* <div className="w-full bg-orange-200 text-yellow-900 px-4 py-2 flex items-center">
              <img
                src="https://svgsilh.com/svg/151889.svg"
                className="w-10 block pr-2"
              />
              <div className="text-sm">
                Congrats you're eligible for a <b>Coupon Code</b> in this order{" "}
              </div>
            </div> */}

            <div>
              <h3 className="text-xl mt-4 font-bold pb-4">Order Summary</h3>
              <div className="flex gap-4 flex-col mb-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
            </div>
            <button onClick={()=>handleOrder()} className="px-4 py-4 bg-purple-700 text-white w-full mt-3 rounded shadow font-bold hover:bg-purple-900">
              Confirm to Pay using points
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;
