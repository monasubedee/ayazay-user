import Link from 'next/link';
import { useRouter } from 'next/router';

const productListSlide = ({ productsubcategory, productbrands }) => {
  const { query } = useRouter();

  return (
    <div className='left_sidebar'>
      <div className='top'>
        <h2>{productsubcategory.name_english}</h2>

        <div className='left_item'>
          {productsubcategory.subcategories !== undefined
            ? productsubcategory.subcategories.map((subcategory) => {
                return (
                  <Link href={`/category/${query.id}/?subcategory=${subcategory.id}`}>
                    <div className='subcategory_wrapper' key={subcategory.id}>
                      <p>
                        {subcategory.name_english.length > 40
                          ? `${subcategory.name_english.split('').slice(0, 40).join('')}....`
                          : subcategory.name_english.split('').slice(0, 20).join('')}
                        `{subcategory.name_english}
                      </p>
                      <i className='fa fa-angle-right' aria-hidden='true'></i>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
      {/*<div className="bottom">
        <h2>Brands</h2>
        <div className="brand_wrapper">
          {
            productbrands.map((brand, i) => {
              if (i < 6)
                return (
                  <div className="bottom_item" key={i}>
                    <div className="column" >
                      <div className="empty"></div>
                      <p className="text">{brand.name}</p>
                    </div>
                  </div>

                )
            })
          }
        </div>

        </div>*/}
      <style jsx>{`

.consumer{
  padding-left:6px;
}
.items{
  padding-left:6px;
}
.subcategory_wrapper{
  display:flex;
  justify-content:space-between;
  padding-bottom:10px;
  cursor:pointer;
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
  background:#fff;
  flex:35%;
  margin-right: 45px;
}

.empty{

  height: 57px;
  background: #f0f0f0;
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
  margin-bottom:20px;
}
.bottom_item .column{
  width:100%;
}

.brand_wrapper{
  display:grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows:1fr 1fr 1fr;
  grid-row-gap:19px;
  grid-column-gap:19px;

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;
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
.
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
  );
};

export default productListSlide;
