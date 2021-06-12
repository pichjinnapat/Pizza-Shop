import React, { FunctionComponent } from 'react'
import Button from '../../components/Button'
import { Product, ProductSize } from '../../types'

type ProductSelectorProp = {
  product: Product
  selected: boolean
  productSize: ProductSize
  productNumber: number
  selectProduct: (product: Product) => void
  selectSize: (size: ProductSize) => void
  selectNumber: (number: number) => void
  onOrder: () => void
}

const ProductSelector: FunctionComponent<ProductSelectorProp> = ({
  product,
  selectProduct,
  selectSize,
  selectNumber,
  onOrder,
  selected,
  productSize,
  productNumber,
}) => {
  const productSizeList = [ProductSize.SMALL, ProductSize.MEDIUM, ProductSize.LARGE]

  const handleProductSelection = (selectedProduct: Product): void => {
    if (selected) {
      selectProduct({} as Product)
      selectSize('' as ProductSize)
      selectNumber(0)
    } else {
      selectProduct(selectedProduct)
      selectSize('' as ProductSize)
      selectNumber(0)
    }
  }

  const onIncrement = (): void => {
    selectNumber(productNumber + 1)
  }
  const onDecrement = (): void => {
    if (productNumber - 1 < 0) {
      selectNumber(0)
    } else {
      selectNumber(productNumber - 1)
    }
  }

  return (
    <div>
      <div className="px-4 w-full shadow-xl bg-yellow-100 rounded-3xl overflow-hidden">
        <img className="-mt-12 mx-auto" src={`/img/${product.type}.png`} alt={product.type} />
        <div className="lg:flex justify-between my-2 text-center">
          <p className="text-base sm:text-xl font-bold my-auto">{product.type}</p>
          <Button
            className="mx-auto lg:mx-0"
            icon={{
              iconPath: selected ? '/svg/chevron-up.svg' : '/svg/chevron-down.svg',
              iconShowing: selected ? !selected : selected,
            }}
            secondary={selected}
            onClick={() => handleProductSelection(product)}
          >
            {selected ? 'Cancel' : 'Order Now!'}
          </Button>
        </div>
      </div>

      <div
        className={`w-full lg:w-2/3 lg:float-right px-4 shadow-xl bg-yellow-100 rounded-3xl overflow-hidden transition-all duration-300 origin-top transform ${
          selected ? 'translate-y-2 max-h-full' : 'scale-0 max-h-0'
        }`}
      >
        <div className="my-2 text-center">
          <div className="py-2">
            <p>Size</p>
            <div className="grid grid-cols-3 space-x-1">
              {productSizeList.map((size) => (
                <Button
                  key={size}
                  className="mx-auto w-10 h-10"
                  secondary={productSize !== size}
                  onClick={() =>
                    productSize === size ? selectSize('' as ProductSize) : selectSize(size)
                  }
                >
                  <div className="mx-auto">{size.toUpperCase()}</div>
                </Button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="py-2">
              <p>Number</p>
              <div className="flex justify-center">
                <Button className="w-14 h-10" onClick={onDecrement}>
                  <div className="mx-auto my-auto text-xl align-middle -mt-1">-</div>
                </Button>
                <div className="border-2 border-secondary bg-opacity-0 rounded-full p-2 w-14 h-10">
                  {productNumber}
                </div>
                <Button className="w-14 h-10" onClick={onIncrement}>
                  <div className="mx-auto my-auto text-xl align-middle -mt-1">+</div>
                </Button>
              </div>
              <div className="my-2 mx-auto">
                <Button
                  className="mx-auto my-2"
                  disabled={!(productNumber > 0 && !!productSize)}
                  onClick={onOrder}
                >
                  Order!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSelector
