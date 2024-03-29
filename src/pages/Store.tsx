import StoreItem from "../components/StoreItem";
import { useState,useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/features/actions/products';

export default function Store() {

  const dispatch = useDispatch();

  const {products, loading, error} = useSelector((state:any) => state.products);

  const token = localStorage.getItem('token');


  useEffect(() => {
      dispatch(fetchProducts() as any);

  }

  , [dispatch]);

  console.log(products)
  

  
 

  return (
    <>
 
      <h1 className="text-4xl m-8">Your Best Book Store</h1>
      <div className="flex flex-wrap pl-8">
        {products&&products.map((item:any) => {
          return (
            <div key={item.id}>
              <StoreItem {...item} />
            </div>
          );
        })}
      </div>
              
   
  
    </>
  );
}
