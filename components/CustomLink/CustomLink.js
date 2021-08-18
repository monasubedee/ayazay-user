import Link from "next/link";
import PropTypes from "prop-types";

const CustomLink = ({ type, id, children }) => {

  const productDetail = (type, id, children) => {
    if (type == "product") {
      return (
        <Link href="/productdetail/[pid]" as={`/productdetail/${id}`}>
          {children}
        </Link>
      );
    } else if (type == "category") {
      return (
        <Link href={`productlist?category=${id}`}>
          {children}
        </Link>
      );
    } else if (type == "shop") {
      return (
        <Link href={`/shopdetail/${id}`}>
          {children}
        </Link>
      );
    } else if (type == "brand") {
      return (
        <Link href="/productlist?brand=[pid]" as={`/productlist?brand=${id}`}>
          {children}
        </Link>
      );
    }
    else {
      return null;
    }
  };

  return productDetail(type, id, children);
};

CustomLink.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default CustomLink;
