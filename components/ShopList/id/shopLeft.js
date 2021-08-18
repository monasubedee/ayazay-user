
import Link from 'next/link';


const ShopLeft = ({ shopList, handleDeleteSlide }) => {

    return (
        <div className="left_sidebar">
            <div className="top">
                <div className="left_item">
                    {
                        shopList.data !== undefined ?
                            shopList.data.map((shop) => {
                                return (
                                    <Link href={`/shopList?id=${shop.id}`}>
                                        <div className="shopList_wrapper" key={shop.id} onClick={handleDeleteSlide}>
                                            <p>{shop.name}</p>
                                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                                        </div>

                                    </Link>
                                )
                            })
                            : null
                    }
                </div>
            </div>

            <style jsx>
                {
                    `
                    .left_sidebar{
                        background:#fff;
                        flex:35%;
                        margin-right:45px;
                        color:#272b35;
                        padding-bottom:50px;
                        cursor:pointer;
                    }
                    .left_item{
                        flex:35%;
                    }
                    .shopList_wrapper{
                        display:flex;
                        justify-content:space-between;
                        padding-bottom:10px;
                    }
                    @media(max-width:876px){
                        .left_sidebar{
                            margin-right:10px;
                        }
                    }
                    `
                }
            </style>

        </div>
    )
}

export default ShopLeft;