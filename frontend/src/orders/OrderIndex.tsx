import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { getProducts } from '../reducers/ProductReducer'
import { ProductState } from '../types'

const OrderIndex: FunctionComponent = () => {
  const dispath = useDispatch()
  const { products } = useSelector((state: { products: ProductState }) => state.products)

  useEffect(() => {
    dispath(getProducts())
  }, [dispath])

  return (
    <Layout>
      Order Index
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="p-4 shadow-xl bg-yellow-100 rounded-3xl overflow-hidden">
            <img className="-mt-12" src={`/img/${product.type}.png`} alt={product.type} />
            <div className="lg:flex justify-between my-2 text-center">
              <p className="text-base sm:text-xl font-bold my-auto">{product.type}</p>
              <button className="align-middle justify-self-center text-base btn-primary my-auto mx-auto lg:mx-0 flex">
                <p>Order Now!</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default OrderIndex
