import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '../components/Button'
import Layout from '../components/Layout'
import { setUserInfo } from '../reducers/OrderReducer'
import { OrderState, Product, ProductSize } from '../types'
import { OrderRoutes } from './OrderRouters'

type UserFormType = {
  firstname: string
  lastname: string
  email: string
  address: string
}

const OrderUserInformation: FunctionComponent = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { selectedProduct, selectedSize, selectedNumber, userInfo } = useSelector(
    (state: { orders: OrderState }) => state.orders
  )
  const [formData, setFormdata] = useState<UserFormType>(userInfo)
  const [errors, setErrors] = useState<UserFormType>({} as UserFormType)

  const productSizeName = (size: ProductSize): string => {
    if (size === ProductSize.SMALL) return 'Small'
    if (size === ProductSize.MEDIUM) return 'Medium'
    if (size === ProductSize.LARGE) return 'Large'
    return ''
  }

  const getTotalPrice = (product: Product, size: ProductSize, number: number): number => {
    if (size === ProductSize.SMALL) return product.price_s * number
    if (size === ProductSize.MEDIUM) return product.price_m * number
    if (size === ProductSize.LARGE) return product.price_l * number
    return 0
  }

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

    if (!formData.firstname) {
      error = { ...error, firstname: 'FIRSTNAME is required!' }
    } else {
      error = { ...error, firstname: '' }
    }

    if (!formData.lastname) {
      error = { ...error, lastname: 'LASTNAME is required!' }
    } else {
      error = { ...error, lastname: '' }
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

    if (!error.firstname && !error.lastname && !error.email && !error.address) {
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
            <div className="text-bold">{`$${getTotalPrice(
              selectedProduct,
              selectedSize,
              selectedNumber
            )}.-`}</div>
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
            <div className={`label-text-input w-1/3 ${errors.firstname && 'error'}`}>
              First Name
            </div>
            <input
              id="firstname"
              className={`text-input w-2/3 ${errors.firstname && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.firstname && 'visible'}`}>{errors.firstname}</p>
          </div>

          <div className="w-full px-1 min-h-12 sm:h-12 flex flex-wrap my-2 col-span-2 sm:col-span-1">
            <div className={`label-text-input w-1/3 ${errors.lastname && 'error'}`}>Last Name</div>
            <input
              id="lastname"
              className={`text-input w-2/3 ${errors.lastname && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.lastname && 'visible'}`}>{errors.lastname}</p>
          </div>

          <div className="w-full px-1 h-12 flex flex-wrap my-2 col-span-2">
            <div className={`label-text-input w-1/3 sm:w-1/5 ${errors.email && 'error'}`}>
              Email
            </div>
            <input
              id="email"
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
              rows={3}
              className={`textarea-input w-2/3 sm:w-4/5 ${errors.address && 'error'}`}
              onChange={handleChange}
              onBlur={onBlurValidation}
            />
            <p className={`error-text ${!errors.address && 'visible'}`}>{errors.address}</p>
          </div>
        </div>
        <div className="w-full flex justify-between ">
          <Button secondary onClick={() => history.goBack()}>
            &nbsp;&nbsp;Back&nbsp;&nbsp;
          </Button>
          <Button type="submit">&nbsp;&nbsp;Next&nbsp;&nbsp;</Button>
        </div>
      </form>
    </Layout>
  )
}

export default OrderUserInformation
