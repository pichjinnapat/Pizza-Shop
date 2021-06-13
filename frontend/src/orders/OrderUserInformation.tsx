import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'
import Layout from '../components/Layout'
import productSizeName from '../lib/productSizeName'
import { setUserInfo } from '../reducers/OrderReducer'
import { OrderState } from '../types'
import { OrderRoutes } from './OrderRouters'

type UserFormType = {
  first_name: string
  last_name: string
  email: string
  address: string
}

const OrderUserInformation: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedProduct, selectedSize, selectedNumber, totalPrice, userInfo } = useSelector(
    (state: { orders: OrderState }) => state.orders
  )
  const [formData, setFormdata] = useState<UserFormType>(userInfo)
  const [errors, setErrors] = useState<UserFormType>({} as UserFormType)

  const validateEmail = (inputText: string): boolean => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@([\w-]+\.)+[a-zA-Z0-9-]{2,4}$/
    if (inputText.match(mailformat)) {
      return true
    }
    return false
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormdata({ ...formData, [e.target.id]: e.target.value })
  }

  const formValidation = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    let error: UserFormType = errors

    if (!formData.first_name) {
      error = { ...error, first_name: 'FIRSTNAME is required!' }
    } else {
      error = { ...error, first_name: '' }
    }

    if (!formData.last_name) {
      error = { ...error, last_name: 'LASTNAME is required!' }
    } else {
      error = { ...error, last_name: '' }
    }

    if (!formData.email) {
      error = { ...error, email: 'EMAIL is required!' }
    } else {
      error = { ...error, email: '' }
    }

    if (formData.email && !validateEmail(formData.email)) {
      error = { ...error, email: 'EMAIL is invalid!' }
    }

    if (!formData.address) {
      error = { ...error, address: 'ADDRESS is required!' }
    } else {
      error = { ...error, address: '' }
    }

    setErrors(error)

    if (!error.first_name && !error.last_name && !error.email && !error.address) {
      dispatch(setUserInfo(formData))
      history.push(OrderRoutes.ORDER_PAYMENT)
    }
  }

  const onBlurValidation = (
    e: React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>
  ): void => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.id]: `${e.target.id.toUpperCase()} is required!` })
    } else if (e.target.id === 'email') {
      if (validateEmail(e.target.value)) {
        setErrors({ ...errors, [e.target.id]: '' })
      } else {
        setErrors({ ...errors, [e.target.id]: 'EMAIL is invalid!' })
      }
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

      <form
        className="w-full bg-yellow-100 p-4 my-4 rounded-2xl shadow-xl"
        onSubmit={formValidation}
      >
        <p className="text-3xl font-bold my-2">Your Information</p>
        <div className="grid grid-cols-2">
          <div className="w-full px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
            <div className={`label-text-input w-1/3 ${errors.first_name && 'error'}`}>
              First Name
            </div>
            <input
              id="first_name"
              value={formData.first_name}
              className={`text-input w-2/3 ${errors.first_name && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.first_name && 'visible'}`}>{errors.first_name}</p>
          </div>

          <div className="w-full px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
            <div className={`label-text-input w-1/3 ${errors.last_name && 'error'}`}>Last Name</div>
            <input
              id="last_name"
              value={formData.last_name}
              className={`text-input w-2/3 ${errors.last_name && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.last_name && 'visible'}`}>{errors.last_name}</p>
          </div>

          <div className="w-full px-1 h-12 flex flex-wrap my-2 col-span-2">
            <div className={`label-text-input w-1/3 sm:w-1/5 ${errors.email && 'error'}`}>
              Email
            </div>
            <input
              id="email"
              value={formData.email}
              className={`text-input w-2/3 sm:w-4/5 ${errors.email && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.email && 'visible'}`}>{errors.email}</p>
          </div>

          <div className="w-full px-1 flex flex-wrap my-2 col-span-2">
            <div className={`label-text-input w-1/3 sm:w-1/5 ${errors.address && 'error'}`}>
              Address
            </div>
            <textarea
              id="address"
              value={formData.address}
              rows={3}
              className={`textarea-input w-2/3 sm:w-4/5 ${errors.address && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.address && 'visible'}`}>{errors.address}</p>
          </div>
        </div>

        <div className="w-full flex justify-between">
          <Button secondary onClick={() => history.push(OrderRoutes.ORDER_INDEX)}>
            &nbsp;&nbsp;Back&nbsp;&nbsp;
          </Button>
          <Button type="submit">&nbsp;&nbsp;Next&nbsp;&nbsp;</Button>
        </div>
      </form>
    </Layout>
  )
}

export default OrderUserInformation
