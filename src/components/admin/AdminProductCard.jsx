import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

const AdminProductCard = ({
  link,
  title,
  image1,
  price,
  comparedPrice = null,
  loading,
}) => {
  return (
    <>
      <div className="bg-gray-100 border border-blue-200 rounded-lg shadow hover:scale-105 transition-all">
        <img
          src={image1}
          alt={title}
          className="aspect-square w-full skeleton-loading h-64 object-cover rounded-t-lg"
          loading="lazy"
        />
        <div className="p-4">
          <h3 className={`text-gray-700 text-left ${loading && "skeleton-loading"}`}>{title}</h3>
          <div className="flex gap-4     items-center mt-2">
            <p className={`text-lg font-bold text-gray-900 ${loading && "skeleton-loading"}`}>
              Rs.{price}
            </p>
            {comparedPrice && !isNaN(comparedPrice) ?  (
              <p className={`text-sm line-through ${loading && "skeleton-loading"}`}>
                Rs.{comparedPrice}
              </p>
            ): null}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Link
              to={`/product/${link}`}
              className="text-2xl transition text-gray-700"
            >
              <FaRegEye />
            </Link>

            <Link
              to={`/admin/products/${link}/edit`}
              className="text-2xl transition"
            >
              <CiEdit />
            </Link>

            <button
              className="text-2xl text-red-600 hover:text-red-800 transition"
              data-product_id={""}
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
