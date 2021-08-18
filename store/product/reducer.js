import {
  GET_PRODUCT_DETAIL_ID,
  GET_PRODUCT_DETAIL_ID_ERROR,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_BRANDS,
  GET_PRODUCT_SUBCATEGORY,
  GET_BRAND_PRODUCTS,
  GET_PRODUCTLIST,
  LOAD_MORE,
  GET_SEARCH_PRODUCT,
  GET_SEARCH_PRODUCT_NAME,
  GET_SIMILAR_PRODUCT
  
} from "./type";

const initialState = {
  productList: [],
  productDetail: null,
  error: false,
  errorMessage: null,
  productcategory: null,
  productcategories: [],
  productbrands: [],
  brandProducts: [],
  productsubcategory: [],
  loadmorecount: '',
  searchProducts:[],
  searchProductNames:[],
  similarProducts:[]

};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_DETAIL_ID:
      return {
        ...state,
        productDetail: { ...action.payload },
        error: false,
        errorMessage: null,
      };
    case GET_PRODUCT_DETAIL_ID_ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    case GET_PRODUCTLIST:
      return {
        ...state,
        productList: action.payload
      }
    case GET_PRODUCT_CATEGORIES:
      return {
        ...state,
        productcategories: action.payload
      }
    case GET_PRODUCT_SUBCATEGORY:
      return {
        ...state,
        productsubcategory: action.payload
      }

    case GET_PRODUCT_BRANDS:
      return {
        ...state,
        productbrands: action.payload
      }
    case GET_BRAND_PRODUCTS:
      return {
        ...state,
        brandProducts: action.payload

      }
    case GET_PRODUCT_CATEGORY:
      return {
        ...state,
        productcategory: action.payload.data,
        loadmorecount: action.payload.total
      }
    case LOAD_MORE:
      return {
        ...state,
        productcategory: [...state.productcategory, ...action.payload.data]
      }
    case GET_SEARCH_PRODUCT:
      return {
        ...state,
        searchProducts:action.payload

      }

    case GET_SEARCH_PRODUCT_NAME:
      return{
        ...state,
        searchProductNames:action.payload
      }
    
    case GET_SIMILAR_PRODUCT:
      return{
        ...state,
        similarProducts:action.payload
      }
  
    default:
      return state;
  }
};

export default ProductReducer;
