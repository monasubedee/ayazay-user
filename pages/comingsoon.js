import Layout from "../components/Layout"
import { useDispatch } from 'react-redux';
import { getSearchProduct } from '../store/product/action';

const ComingSoon = () => {

  const dispatch = useDispatch();

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  }

  return (
    <Layout  searchProduct={searchProduct}>
      <div className="thank">
        <h1>Coming Soon</h1>
      </div>
      <style jsx>{
        `
          .thank{
            max-width:1140px;
            margin:0 auto;
            height:600px;
            display:flex;
            align-items:center;
            justify-content:center;
            color:#394358;
            text-align:center;
            text-transform: uppercase;
          }
          `
      }
      </style>
    </Layout>
  )
}
export default ComingSoon