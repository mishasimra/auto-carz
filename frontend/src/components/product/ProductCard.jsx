import { ArrowRight, BadgeIndianRupee } from "lucide-react";
import { Link } from "react-router-dom";
import { productCatalog } from "../../constants/productCatalog.js";

const getImageUrl = (image) =>
  image?.startsWith("/uploads")
    ? `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "")}${image}`
    : image;

const getLocalProductImage = (product) =>
  product.image ||
  productCatalog.find(
    (catalogProduct) =>
      catalogProduct.id === product.id ||
      catalogProduct.id === product.slug ||
      catalogProduct.name.toLowerCase() === product.name?.toLowerCase()
  )?.image;

const getProductCategory = (product) =>
  typeof product.category === "string" ? product.category : product.category?.name;

const getProductLink = (product) =>
  product.slug
    ? `/products/${product.slug}`
    : `/products?category=${getProductCategory(product)?.toLowerCase() || "all"}`;

const ProductCard = ({ product }) => (
  <article className="product-card group">
    <div className="product-image-wrap relative">
      <img
        src={getLocalProductImage(product) || getImageUrl(product.images?.[0])}
        alt={product.name}
        className="w-full h-56 object-cover rounded-t-2xl"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    <div className="product-body">
      <div className="product-meta">
        <span>{getProductCategory(product)}</span>
        {product.price ? (
          <strong>
            <BadgeIndianRupee size={16} />
            {product.price.toLocaleString("en-IN")}
          </strong>
        ) : null}
      </div>
      <h3>{product.name}</h3>
      <p>{product.shortDescription}</p>
      <Link to={getProductLink(product)} className="text-link">
        View details <ArrowRight size={16} />
      </Link>
    </div>
  </article>
);

export default ProductCard;
