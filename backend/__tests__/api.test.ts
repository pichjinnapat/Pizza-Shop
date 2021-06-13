import supertest from 'supertest'
import app from '../src/app'
import { Order, OrderStatus } from '../src/orders'
import { ProductSize } from '../src/products'

const request = supertest.agent(app)

const products = [
  {
    type: 'Margarita',
    price_s: 3.0,
    price_m: 5.0,
    price_l: 8.0,
  },
  {
    type: 'Marinara',
    price_s: 3.0,
    price_m: 5.0,
    price_l: 8.0,
  },
  {
    type: 'Salami',
    price_s: 3.0,
    price_m: 5.0,
    price_l: 8.0,
  },
]

describe('This is a test for api endpoint ', () => {
  it('should successfully access the endpoint', (done) => {
    request
      .get('/')
      .expect(200)
      .then((response) => {
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty('message', 'OK')
        done()
      })
  })
  it('should show all products', (done) => {
    request.get('/products').then((response) => {
      const filterdeResponse = response.body.map((product) => {
        return {
          type: product.type,
          price_s: Number(product.price_s),
          price_m: Number(product.price_m),
          price_l: Number(product.price_l),
        }
      })

      expect(response.status).toEqual(200)
      expect(filterdeResponse).toEqual(products)
      done()
    })
  })
  it('should create new Orders', (done) => {
    const order: Order = {
      product_id: 1,
      number: 2,
      size: ProductSize.LARGE,
      status: OrderStatus.NEW,
      destination_address: 'Bangkok, Thaialnd',
      user_id: 1,
    }
    request
      .post('/orders')
      .send({
        product_id: 1,
        number: 2,
        size: ProductSize.LARGE,
        status: OrderStatus.NEW,
        destination_address: 'Bangkok, Thaialnd',
        user_id: 1,
      })
      .then((response) => {
        const filterdeResponse: Order = {
          product_id: response.body.product_id,
          number: response.body.number,
          size: response.body.size,
          status: response.body.status,
          destination_address: response.body.destination_address,
          user_id: response.body.user_id,
        }

        expect(response.status).toEqual(200)
        expect(filterdeResponse).toEqual(order)
        done()
      })
  })
})
