import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cards from 'react-credit-cards'
import Button from '../components/Button'
import Layout from '../components/Layout'
import productSizeName from '../lib/productSizeName'
import { OrderState, CardFormType } from '../types'
import { OrderRoutes } from './OrderRouters'
import 'react-credit-cards/es/styles-compiled.css'
import { setCardInfo } from '../reducers/OrderReducer'

const OrderPayment: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const {
    selectedProduct,
    selectedSize,
    selectedNumber,
    totalPrice,
    destination_address,
    userInfo,
    cardInfo,
  } = useSelector((state: { orders: OrderState }) => state.orders)

  const [formData, setFormdata] = useState<CardFormType>(cardInfo)
  const [errors, setErrors] = useState<CardFormType>({
    cardNumber: '',
    name: '',
    expiry: '',
    cvc: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (e.target.id === 'cardNumber') {
      setFormdata({ ...formData, [e.target.id]: String(e.target.value.replace(/\D{1,16}/g, '')) })
    } else if (e.target.id === 'cvc') {
      setFormdata({ ...formData, [e.target.id]: String(e.target.value.replace(/\D{1,3}/g, '')) })
    } else {
      setFormdata({ ...formData, [e.target.id]: e.target.value })
    }
  }

  const formValidation = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    let error: CardFormType = errors

    if (!formData.cardNumber) {
      error = { ...error, cardNumber: 'CARD NUMBER is required!' }
    } else {
      error = { ...error, cardNumber: '' }
    }

    if (!formData.name) {
      error = { ...error, name: 'NAME is required!' }
    } else {
      error = { ...error, name: '' }
    }

    if (!formData.expiry) {
      error = { ...error, expiry: 'EXPIRY DATE is required!' }
    } else {
      error = { ...error, expiry: '' }
    }

    if (!formData.cvc) {
      error = { ...error, cvc: 'CVC Number is required!' }
    } else {
      error = { ...error, cvc: '' }
    }

    setErrors(error)

    if (!error.cardNumber && !error.name && !error.expiry && !error.cardNumber) {
      dispatch(setCardInfo(formData))
      history.push(OrderRoutes.ORDER_SUMMARY)
    }
  }

  const onBlurValidation = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
  ): void => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: `${e.target.id.toUpperCase()} is required!` })
    } else {
      setErrors({ ...errors, [e.target.id]: '' })
    }
  }

  useEffect(() => {
    if (!selectedProduct.type || !selectedSize || !selectedNumber) {
      history.push(OrderRoutes.ORDER_INDEX)
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

      <form
        className="w-full bg-yellow-100 p-4 my-2 rounded-2xl shadow-xl flex flex-wrap"
        onSubmit={formValidation}
      >
        <div className="w-full">
          <Cards
            cvc={formData.cvc}
            expiry={formData.expiry.replace('-', '/')}
            name={formData.name}
            number={formData.cardNumber}
          />
        </div>

        <div className="w-full sm:w-1/2 px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
          <div className={`label-text-input w-1/3 ${errors.cardNumber && 'error'}`}>Card No.</div>
          <input
            id="cardNumber"
            value={formData.cardNumber}
            className={`text-input w-2/3 ${errors.cardNumber && 'error'}`}
            maxLength={16}
            onChange={handleChange}
            onBlur={onBlurValidation}
          />
          <p className={`error-text ${errors.cardNumber && 'visible'}`}>{errors.cardNumber}</p>
        </div>

        <div className="w-full sm:w-1/2 px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
          <div className={`label-text-input w-1/3 ${errors.name && 'error'}`}>Name</div>
          <input
            id="name"
            value={formData.name}
            className={`text-input w-2/3 ${errors.name && 'error'}`}
            onChange={handleChange}
            onBlur={onBlurValidation}
          />
          <p className={`error-text ${errors.name && 'visible'}`}>{errors.name}</p>
        </div>

        <div className="w-full sm:w-1/2  px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
          <div className={`label-text-input w-1/3 ${errors.expiry && 'error'}`}>Exp. Date</div>
          <input
            id="expiry"
            type="month"
            min={`${new Date().getFullYear()}-${
              new Date().getMonth() < 10
                ? `0${new Date().getMonth() + 1}`
                : new Date().getMonth() + 1
            }`}
            value={formData.expiry}
            className={`text-input w-2/3 ${errors.expiry && 'error'}`}
            onChange={handleChange}
            onBlur={onBlurValidation}
          />
          <p className={`error-text ${errors.expiry && 'visible'}`}>{errors.expiry}</p>
        </div>

        <div className="w-3/5 sm:w-1/2 px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
          <div className={`label-text-input w-1/3 ${errors.cvc && 'error'}`}>CVC.</div>
          <input
            id="cvc"
            value={formData.cvc}
            maxLength={3}
            className={`text-input w-2/3 ${errors.cvc && 'error'}`}
            onChange={handleChange}
            onBlur={onBlurValidation}
          />
          <p className={`error-text ${errors.cvc && 'visible'}`}>{errors.cvc}</p>
        </div>

        <div className="w-full flex justify-between ">
          <Button secondary onClick={() => history.push(OrderRoutes.ORDER_USER_INFORMATION)}>
            &nbsp;&nbsp;Back&nbsp;&nbsp;
          </Button>
          <Button type="submit">&nbsp;&nbsp;Next&nbsp;&nbsp;</Button>
        </div>
      </form>
    </Layout>
  )
}

export default OrderPayment
