import { useWindowWidth } from '@react-hook/window-size';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { parseCookies } from '../cookie/parseCookies';
import { getHomePage } from '../store/home/action';
import { useSelector, useDispatch } from 'react-redux';
import HomeSlider from '../components/homeSlider';
import ProductCategories from '../components/ProductCategories';
import Layout from '../components/Layout';
import ConsumerElectronics from '../components/consumer_ele/consumer_ele_list';
import TrendingList from '../components/trending/trending_list';
import JustYouList from '../components/just_you/just_you_list';
import PopularCategories from '../components/popular_category/popular_categories';
import StoreLists from '../components/store_lists/store_list';
import Brands from '../components/top_brands/top_brands';
import { getProductCategories, getSearchProduct } from '../store/product/action';
import Popup from '../components/Popup';


export default function Home({ initialModal, props }) {
  const [modal, setModal] = useState();
  const width = useWindowWidth();
  const dispatch = useDispatch();
  const { campaign } = useSelector((state) => state.home);
  const { productcategories, searchProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (initialModal === undefined) {
      setModal(true);
      Cookie.set('modal', false);
    } else if (initialModal === false) {
      setModal(false);
    }
    dispatch(getHomePage());
  }, []);

  const onHandleClose = () => {
    setModal(false);
    Cookie.set('modal', false);
  };

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  // const errorMessage = () => {
  //   const timer = setTimeout(() => {
  //     if(searchProducts.length > 0){
  //       setShow(false);
  //     }
  //     setShow(true);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }

  const renderHomePageLayout = (campaignList) => {
    const layouts = campaignList.map((campObj) => {
      if (campObj.layout === 'Layout1') {
        return renderLayout1(campObj);
      }
      if (campObj.layout === 'Layout2') {
        return renderLayout2(campObj);
      }
      if (campObj.layout === 'Layout3') {
        return renderLayout3(campObj);
      }
      if (campObj.layout === 'Layout4') {
        return renderLayout4(campObj);
      }
      if (campObj.layout === 'Layout5') {
        return renderLayout5(campObj);
      }
      if (campObj.layout === 'Layout6') {
        return renderLayout6(campObj);
      }
    });
    return layouts;
  };

  const renderLayout1 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return (
        <div className='product_wrapper'>
          <ConsumerElectronics key={camp.id} campObj={camp} />
        </div>
      );
    }
    return null;
  };

  const renderLayout2 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return (
        <div className='product_wrapper'>
          <PopularCategories key={camp.id} campObj={camp} />
        </div>
      );
    }
    return null;
  };

  const renderLayout3 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return <TrendingList key={camp.id} campObj={camp} />;
    }
    return null;
  };

  const renderLayout4 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return <StoreLists key={camp.id} campObj={camp} />;
    }
    return null;
  };

  const renderLayout5 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return <Brands key={camp.id} campObj={camp} />;
    }
    return null;
  };

  const renderLayout6 = (camp) => {
    if (camp.campaign_contents.length > 0) {
      return <JustYouList key={camp.id} campObj={camp} />;
    }
    return null;
  };

  /* <div className="product_wrapper">
          <ConsumerElectronics />
          <PopularCategories />
        </div>
        <TrendingList />

        <StoreLists />

        <Brands />
        <JustYouList /> */
  return (
    <Layout {...props} searchProduct={searchProduct}>
      {modal === true ? <Popup closePopup={onHandleClose}></Popup> : null}
      <section className='beauty__personal'>
        <HomeSlider />
        <ProductCategories
          background={'#f0f0f0'}
          color={'#394358'}
          productcategories={productcategories}
        />
        {renderHomePageLayout(campaign)}
      </section>

      <style jsx>
        {`
          .beauty__personal .beauty {
            display: block;
            width: 100%;
            background-size: cover;
            background-position: center;
          }

          .product_wrapper {
            max-width: 1140px;
            margin: auto;
          }

          @media (max-width: 1065px) {
            .product_wrapper {
              padding-left: 4%;
            }
          }

          @media (max-width: 480px) {
            .beauty__personal .beauty {
              margin-bottom: -4px;
            }
          }
        `}
      </style>
    </Layout>
  );
}

Home.getInitialProps = ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialModal: cookies.modal,
  };
};
