import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProductBrands } from '../../../store/product/action';

const ProductDetailSide = ({ handleDeleteSlide }) => {

  const dispatch = useDispatch();
  const { query } = useRouter();

  const { shopProducts } = useSelector((state) => state.shop);

  const { productbrands } = useSelector((state) => state.product);

  const [brandnames, setBrandNames] = useState([]);


  var categoryName = [];
  var subCategoryName = [];

  var brands = [];

  // useEffect(() => {
  //   dispatch(getProductBrands())
  // }, [query.id]);

  // useEffect(() => {
  //   showBrands();
  // },[query.id]);

  // const showBrands = () => {
  //   return (
  //     productbrands.map((brand) => {
  //       console.log(brand);
  //       brands.map((brandArray) => {
  //         if (brandArray.id === brand.id) {
  //           brandnames.push(brand.name);
  //           console.log(brandnames);

  //         }
  //       })

  //     })
  //   )
  // };

  // shopProducts.map((obj) => {
  //   obj.results.map((categories) => {
  //     return (
  //       categories.productBrands.map((brand) => {
  //         return (
  //           brands.push({ "id": brand.id })
  //         )
  //       })
  //     )
  //   })
  // })


  const showSubCategories = () => {
    return (
      shopProducts.map((obj) => {
        obj.results.map((categories) => {

          return (
            categories.productCategorySubcategory.map((category) => {
              categoryName.push(category.category_id.name_english);
              subCategoryName.push(category.subcategory_id.name_english);

              return (category.category_id.name_english);

            })
          )
        })
      })
    )
  }

  showSubCategories();


  let subCategoryArray = (subCategoryName) => subCategoryName.filter((v, i) => subCategoryName.indexOf(v) === i);

  //let brandArray = (brandnames) => brandnames.filter((v,i) => brandnames.indexOf(v) === i);



  return (
    <div className="left_sidebar">
      <div className="top">
        <h2>Sub Categories </h2>
        <div className="left_item">
          {
            subCategoryArray(subCategoryName).map((subcategory, i) => {
              return (
                <div className="sub_category" onClick={handleDeleteSlide} key={i}>
                  <p>{subcategory}</p>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* <div className="bottom">
        <h2>Brands</h2>
        <div className="bottom_item">

          {
            brandArray(brandnames).map((brandname,i) => {
              return (
                <div className="brand_column" key={i}>
                  <div className="empty"></div>
                  <p className="text">{brandname}</p>
                </div>
              )
            })
          }
        </div>
      </div> */}
      <style jsx>{`

    .consumer{
      padding-left:6px;
    }
    .items{
      padding-left:6px;
    }

    .item{
      text-align:center;
      margin: 0 auto;
    }
    .item p{
      color:white;
      margin-top:10px;
    }

    .left_sidebar{
      flex:35%;
      margin-right: 45px;
    }
    .sub_category{
      cursor:pointer;
      display:flex;
      justify-content:space-between;
      padding-bottom:10px;
    }

    .empty{

      height: 57px;
      background: #fff;
    }
    .text{
      text-align:center;
    }

    .left_sidebar{
      color: #272b35;
    }

    .left_sidebar .top h2,
    .left_sidebar .bottom h2{
      font-size: 19px;
      font-weight: bold;
      color: #272b35;
    }
    .bottom_item{
      display:grid;
      grid-template-columns:1fr 1fr;
      grid-gap:16px;
    }
    .bottom_item .column{
      width:43%;
      display:flex;
    }
    .bottom_item p{
      font-size: 13px;
      color: #272b35;
      padding-top:6px;
    }

    .left_sidebar .top span{
      font-size: 18px;
    }
    .left_sidebar .top .left_item {
      padding-bottom: 16px;
    }

    .bottom_item{

      padding-bottom: 19px;
    }


    .btn1{
      background: #aa222a;
      color: #fff;
      width: 117px;
      height: 28px;
      border-radius: 4px;
      border: none;
    }
    .btn1Container{
      text-align:center;
    }
    .btn1:hover,
    .btn2:hover{
      outline: none;
    }

    .top h2{
      padding-bottom: 27px;
    }

    .bottom h2{
      padding-top: 18px;
    }
    @media(max-width:876px){
      .left_sidebar{
        margin-right: 0;
      }
      .top{
        padding-right: 0;
      }
      .btn1{
        display:none;
      }
      .left_sidebar{
        background:#fff;
        flex:35%;
        margin-right: 0;
      }

      .bottom_item p{
        font-size:13px;
      }
      .top {
        padding-right: 10px;
      }
      .left_sidebar .top h2,
      .left_sidebar .bottom h2{
        font-size: 16px;
        font-weight: bold;
        margin-bottom:20px;
      }
      .bottom_item p{
        font-size: 13px;
        color: #272b35;
        padding-top:6px;
      }
      .left_item p{
        font-size:14px;
      }

      .left_sidebar .top span{
        font-size: 14px;
      }




      `}</style>
    </div>


  )
}

export default ProductDetailSide