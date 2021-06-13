import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cards from 'react-credit-cards'
import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import productSizeName from '../lib/productSizeName'
import { ApiStatus, OrderState, OrderStatus, UserState } from '../types'
import 'react-credit-cards/es/styles-compiled.css'
import Button from '../components/Button'
import { createUser } from '../reducers/UserReducer'
import { createOrder } from '../reducers/OrderReducer'
import { OrderRoutes } from './OrderRouters'

const OrderSummary: FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [agreeTerms, setAgreeTerms] = useState(false)
  const {
    selectedProduct,
    selectedSize,
    selectedNumber,
    totalPrice,
    destination_address,
    userInfo,
    cardInfo,
    apiStatus: OrderApiStatus,
  } = useSelector((state: { orders: OrderState }) => state.orders)
  const { user, apiStatus: UserApiStatus } = useSelector(
    (state: { users: UserState }) => state.users
  )

  const onConfirmClick = (): void => {
    dispatch(createUser(userInfo))
  }

  useEffect(() => {
    if (UserApiStatus === ApiStatus.fulfilled) {
      dispatch(
        createOrder({
          product_id: selectedProduct.id,
          number: selectedNumber,
          size: selectedSize,
          status: OrderStatus.NEW,
          destination_address,
          user_id: user.id || 0,
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserApiStatus])

  useEffect(() => {
    if (OrderApiStatus === ApiStatus.fulfilled) {
      history.push(OrderRoutes.ORDER_CONFIRMATION)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OrderApiStatus])

  useEffect(() => {
    if (!selectedProduct.type || !selectedSize || !selectedNumber) {
      history.push(OrderRoutes.ORDER_INDEX)
    }

    return () => {
      setAgreeTerms(false)
    }
  }, [history, selectedNumber, selectedProduct, selectedSize])

  return (
    <Layout>
      <div className="w-full bg-yellow-100 p-4 my-2 rounded-2xl shadow-xl">
        <p className="text-3xl font-bold">Your Order</p>
        <div>
          <p className="text-2xl text-left">{`${selectedNumber}x ${productSizeName(selectedSize)} ${
            selectedProduct.type
          }`}</p>

          <div className="text-xl text-right flex justify-end">
            <p>Total&nbsp;</p>
            <div className="text-bold">{`$${totalPrice}.-`}</div>
          </div>
        </div>
      </div>

      <div className="w-full bg-yellow-100 p-4 my-4 rounded-2xl shadow-xl">
        <p className="text-3xl font-bold">Your Information</p>
        <div>
          <b>Name : </b>
          {`${userInfo.first_name} ${userInfo.last_name}`}
        </div>
        <div>
          <b>Email : </b>
          {userInfo.email}
        </div>
        <div>
          <b>Address : </b>
          {destination_address}
        </div>
      </div>

      <div className="w-full bg-yellow-100 p-4 my-2 rounded-2xl shadow-xl flex flex-wrap">
        <div className="w-full">
          <Cards
            cvc={cardInfo.cvc}
            expiry={cardInfo.expiry.replace('-', '/')}
            name={cardInfo.name}
            number={cardInfo.cardNumber}
          />
        </div>
      </div>

      <div className="w-full bg-yellow-100 p-4 my-2 rounded-2xl shadow-xl flex flex-wrap">
        <input
          id="terms"
          type="checkbox"
          className="w-5 h-5 my-auto"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label htmlFor="terms" className="px-2">
          Please agree Terms and Conditions
        </label>
      </div>
      <div className="w-full flex justify-between ">
        <Button secondary onClick={() => history.push(OrderRoutes.ORDER_PAYMENT)}>
          &nbsp;&nbsp;Back&nbsp;&nbsp;
        </Button>
        <Button disabled={!agreeTerms} onClick={onConfirmClick}>
          &nbsp;&nbsp;&nbsp;&nbsp;Confirm&nbsp;&nbsp;&nbsp;&nbsp;
        </Button>
      </div>
    </Layout>
  )
}

export default OrderSummary
