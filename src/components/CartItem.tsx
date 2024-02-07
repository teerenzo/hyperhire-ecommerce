import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItem from "../data/items.json";
import { useSelector,useDispatch } from 'react-redux';
import formatCurrency from "../utilities/formatCurrency";
type CartItemProps = {
  id: number;
  quantity: number;
};

export default function CartItem({ id, quantity }: CartItemProps) {
  const {products, loading, error} = useSelector((state:any) => state.products);
  const item =products&&products.find((i:any) => i.id === id);
  const { removeFromCart } = useShoppingCart();

  if (item == null) return null;

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center mr-4">
          <img src={item.cover_image_url} className=" h-20 w-32 object-cover mr-2" />
          <div>
            <p>
              {item.name}{" "}
              {quantity > 1 && (
                <span className=" text-xs text-zinc-600">x{quantity}</span>
              )}{" "}
            </p>
            <p>{formatCurrency(item.price)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <p className="mr-4">{formatCurrency(item.price * quantity)}</p>
          <button
            className="h-10 w-10 rounded-md border-2 hover:text-red-600 hover:border-red-600 "
            onClick={() => removeFromCart(item.id)}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}
