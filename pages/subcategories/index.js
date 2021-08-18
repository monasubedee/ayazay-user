import { getProductSubCategory } from '../../store/product/action';
import Layout from '../../components/Layout';
import ProductCategories from '../../components/productList/product_categories';
import ProductListSlide from './productListSlide';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';



const ProductSubCategory = () => {

    const [slide, setSlide] = useState(false);
    const handleSlick = () => {
        setSlide(true)
    }
    const handleDeleteSlide = () => {
        setSlide(false)
    }

    const ProductSubCategory = () => {
        dispatch(getProductSubCategory(query.id))
    }

    const { query } = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        ProductSubCategory();
    }, []);

    ProductSubCategory();

    return (
        <Layout>
            <div className="container">
                <ProductCategories />
                <div className="sub_container">
                    {slide === true ? (
                        <div className="slideMenu">
                            <div className="slideCloseBtn" onClick={handleDeleteSlide}>
                                <p>Close <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                            </div>
                            <ProductListSlide />
                        </div>
                    ) : null}
                    <div className="slideBar">
                        <ProductListSlide />
                    </div>
                    <div className="right_sidebar">
                        <div className="right_sidebar_header">
                            <div className="column_1">
                                <p> <strong className='consumer'>Consumer Electronics <i className="fa fa-angle-right" aria-hidden="true"></i></strong></p>
                                <p className='items'>512 items found in Mobile Phones.</p>
                            </div>
                            <div className="column_2">
                                <div className="filterContainer">
                                    <div className="filterBy" name="" id="" onClick={handleSlick}>
                                        <span>FILTER BY <i className="fas fa-chevron-down"></i></span>
                                    </div>
                                    <p>SORT BY</p>
                                    <select name="" id="">
                                        <option value="popularity">POPULARITY</option>
                                    </select>
                                </div>
                                <div className="selection_list">
                                    <p>Clear Filter</p>
                                    <p>Samsung <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                    <p>Smart Phones <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="item_flex">
                            <Link href="/productdetail/[1]" as={`/productdetail/${15}`}>
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                            <Link href="/productDetail">
                                <div className="item_detail">
                                    <a>
                                        <img src="/images/productlist.jpg" alt="" />
                                    </a>
                                </div>
                            </Link>
                        </div>
                        <div className="load">
                            <button className="btn2">LOAD MORE</button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`

*{
box-sizing: border-box;
}

// slideContainer
.slideMenu{
 width:calc(16% + 220px);
height: 100%;
position: fixed;
z-index: 1;
top: 0;
left: 0;
background-color: #ffffff;
overflow-x: hidden;
transition: 0.5s;
padding-top:30px;
padding:20px;
border-r
  -moz-box-shadow:    -3px 0 5px 0 #555;
-webkit-box-shadow: -3px 0 5px 0 #555;
box-shadow:         -3px 0 5px 0 #555;
}

.filterBy{
border:1px solid #aa222a;
padding:5px;
margin-right:10px;
color:#aa222a;
font-size:13px;
}
.filterBy span i{
font-size:12px;
color:#aa222a;
}

.slideCloseBtn{
padding:18px;
text-align:right;
border-bottom:1px solid #cbcbcb;
margin-bottom:20px;
font-size:14px;
}
.slideBar{
width:34%;
}

.slide_container{
max-width: 1140px;
margin:0 auto;
}

.item i{
color :#fffff!important;
font-size:20px!important;
}
.item p{
color :#fffff!important;
font-size:15px!important;
}
*:focus {
outline: 0;
outline: none;
}
.slide_menu{
padding:20px;
background: #f58723;
color: #fff;
position: relative;
}
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
.left-sidebar{
background:#fff;
flex:35%;
margin-right: 45px;
}

.empty{
width: 158px;
height: 57px;
background: #f0f0f0;
}
.text{
text-align:center;
}

.sub_container{
display: flex;
max-width: 1140px;
margin: 0 auto;
}
.right_sidebar{
flex:76%;
}
select {

}
.filterBy{
display:none;
}

.btn2:hover{
outline: none;
}

.bottom{

padding-top: 35px;
}

.nav .fa{
font-size: 36px;
}

.nav i, .nav p {
opacity: 50%;
}



.sub_container{
padding-top: 61px;
}

.right_sidebar_header{
display: flex;
justify-content: space-between;
margin-bottom :30px;
}
.column_2{
display:flex;
}
.column_2 p{
padding:10px;
font-size:14px;
}
.filterContainer{
display:flex;
}
.column_2 select{
padding: 6px;
color: #aa222a;
margin-right: 16px;
}

.column_1 p i{
margin-left:30px ;
}

.btn2{
background: #aa222a;
color: #fff;
width: 350px;
height: 52px;
border-radius: 8px;
border: none;
}

.item_detail img{
width: 100%;
margin-bottom:10px;
}

.item_flex{
min-width: 100%;
}

.load{
text-align: center;
padding: 32px;
}

.selection_list{
display: none;
}


@media(max-width:876px){

.slideBar{
    display:none;
}
.column_2 p{
    display:none
}
.column_2{
    flex-direction:column;
}
.filterBy{
    display:block;
}
.Filter_section{
    display: block;
}
.right_sidebar_header{
   flex-direction: column-reverse;
   margin-left:1%;
}


.btn2{
    width: 50%;
}
.column_2{
    border-bottom: 1px solid gray ;
    padding: 10px 2px;
    margin-bottom:20px;
}
.item{
    text-align:center;
    display:flex;
    flex-direction:row;
    justify-content:center;
}
.item p{
    margin-left :5px;
    margin-top:0px;
}
.selection_list{
    margin-top:20px;
    display: flex;
    flex-direction: row;
    padding:10px 0px;
}

.selection_list p{
    border-right: 2px solid #000;
    padding:0 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.selection_list p span{
    margin-left: 10px;
}
.selection_list p:first-child{
  padding-left:0px;
}

.selection_list p:last-child{
    border: none;
    padding-right:0px;

}

}


@media (max-width:476px){

.sub_container{
    padding: 0;
}

}


@media screen and (min-width: 200px) {
.item_flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.item_detail {
    flex: 0 1 calc(50% - 1em);
}
}

@media screen and (min-width: 576px) {
.item_detail {
    flex: 0 1 calc(25% - 1em);
}

}



`}</style>

        </Layout >

    )
}


export default ProductSubCategory;