import Link from 'next/link';

const ProductCategories = () => {
  return (
    <div className="product_container">
      <div className="product_categories">
        <Link href="/productlist">
          <div className="category_container">
            <div className="product_one_ce">
              <i className="fa fa-mobile" aria-hidden="true"></i>
              <span className="product_text">Consumer Electronics</span>
            </div>
          </div>
        </Link>
        <div className="category_container">
          <div className="product_one">
            <i className="fa fa-birthday-cake" aria-hidden="true"></i>
            <span className="product_text">Food & Beverage</span>
          </div>
        </div>
        <div className="category_container">
          <div className="product_one">
            <i className="fas fa-tshirt" aria-hidden="true"></i>
            <span className="product_text">Fashion & Apparel</span>
          </div>
        </div>
        <div className="category_container">
          <div className="product_one">
            <i className="fas fa-cut" aria-hidden="true"></i>
            <span className="product_text">Home & Garden</span>
          </div>
        </div>
        <div className="category_container">
          <div className="product">
            <i className="fa fa-cog" aria-hidden="true"></i>
            <span className="product_text">Machinery</span>
          </div>
        </div>
        <div className="category_container">
          <div className="product">
            <i className="fa fa-home" aria-hidden="true"></i>
            <span className="product_text">Accessories</span>
          </div>
        </div>
      </div>

      <style jsx>

        {

          `
            .product_container {
            background-color: #f0f0f0;
          }

          .product_categories {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            max-width: 1140px;
            margin: auto;
            overflow-x: scroll;
            cursor: pointer;
            margin-top: -4px;
          }
          .product_categories::-webkit-scrollbar {
            display: none;
          }

          .product_categories > div {
            margin-left: auto;
            margin-right: auto;
            margin-top: 17px;
          }
          .product_categories i {
            font-size: 32px;
            color: #394358;
          }
          .product_one {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 182px;
          }
           .product i:hover {
            color: #aa222a;
          }
          .product_one i:hover {
            color: #aa222a;
          }
          .product_one_ce i:hover {
            color: #aa222a;
          }

          .product {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 182px;
          }
          .product_one_ce {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 182px;
          }

          .product_text {
            padding: 20px 0;
            font-weight: 500;
            color: #394358;
          }

          @media(max-width:1065px){
             .product_container {
              padding: 0 20px;
            }
          }

          @media(max-width:876px){
            .product_categories {
              font-size: 15px;
            }

            .product_categories {
              padding-left: 10px;
              padding-top: 10px;
              padding-bottom: 10px;
            }

            .product_categories i {
              font-size: 26px;
            }
            .product_categories span {
              width: 100%;
              padding-left: 10px;
            }
            .product_categories > div {
              margin-top: 0px;
              padding-left: 10px;
            }
            .product_group .product1 {
              margin-right: 0px;
            }
            .product {
              flex-direction: row;
              padding: 0 10px;
            }
            .product_one,
            .product_one_ce {
              flex-direction: row;
              width: 212px;
            }
          }

          @media(max-width:480px){
              .product_categories {
              font-size: 14px;
            }
            .product {
              width: 100%;
            }

            .product_one {
              width: 177px;
            }

            .product_categories {
              padding-left: 0px;
            }
            .product_categories span {
              padding-left: 0px;
            }

            .product_info {
              margin-top: 42px;
            }
            .product_categories i {
              font-size: 24px;
              padding: 0 10px;
            }
            .product_categories > div {
              margin-top: 0px;
            }
            .product {
              flex-direction: row;
              padding: 0 10px;
            }
            .product_container {
              padding: 0 5px;
              overflow: hidden;
            }
          }
        `
        }
      </style>
    </div>
  )
}


export default ProductCategories;