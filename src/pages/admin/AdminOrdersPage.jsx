import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import BouncingBallLoader from "../../components/BouncingBallLoader";
import AdminProductCard from "../../components/admin/AdminProductCard";
import Swal from "sweetalert2";
import { orderBy, startAfter, collection, query, limit, getDocs, where,  } from 'firebase/firestore';
import { db } from "../../modules/firebase-modules/firestore";
import AdminOrderCard from "../../components/admin/AdminOrderCard";
import DatePicker from "../../components/DatePicker";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("createdAt"); 
  const [toDate, setToDate] = useState(null); 
  const [fromDate, setFromDate] = useState(null); 
  // Default sort by title
  const [filterTag, setFilterTag] = useState(""); // Default no filter
  const loader = useRef(null);


  useEffect(()=>{console.table(orders[0])},[orders])
  useEffect(()=>{
    console.log(fromDate)
    const refreshOrders = async()=>{
      setLastVisible(null)
      setInitialLoading(true)
      await loadMoreOrders()
    }
    refreshOrders()
  },[fromDate, toDate])

  useEffect(() => {
    loadMoreOrders();
  }, [sortOrder, filterTag]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMoreOrders();
      }
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [loading, hasMore]);

  const paginateDocs = async (collectionName, numDocs, lastVisibleDoc = null) => {
    try {
      let q;

      if (lastVisibleDoc) {
        q = query(
          collection(db, collectionName),
          orderBy(sortOrder, "desc"),
          startAfter(lastVisibleDoc),
          limit(numDocs),
        );
      } else {
        q = query(
          collection(db, collectionName),
          orderBy(sortOrder, "desc"),
          limit(numDocs),
        );
      }

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        doc,
      }));

      return documents;
    } catch (error) {
      console.error("Error loading documents: ", error);
      return [];
    }
  };

  const loadMoreOrders = async () => {
    setLoading(true);
    const PAGE_SIZE = 15;
    try {
      const ordersData = await paginateDocs("orders", PAGE_SIZE, lastVisible);
      
      if (ordersData.length === 0) {
        setHasMore(false);
      } else {
        setLastVisible(ordersData[ordersData.length - 1].doc);

        // Filter documents based on the selected date range
        const filteredOrders = ordersData.filter((order) => {
          const createdAtDate = order.createdAt.toDate();
          return (!fromDate || createdAtDate >= new Date(fromDate)) &&
                 (!toDate || createdAtDate <= new Date(toDate));
        });

        setOrders((prevOrders) => {
          const newOrders = filteredOrders.map((doc) => ({
            id: doc.id,
            ...doc,
          }));
          const uniqueOrders = newOrders.filter(
            (newOrder) =>
              !prevOrders.some(
                (prevOrder) => prevOrder.id === newOrder.id
              )
          );
          return [...prevOrders, ...uniqueOrders];
        });
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }

    setLoading(false);
    setInitialLoading(false);
  };
  


  const productData = {
    product_id: "001",
    primaryImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-YIGV8GTRHiW_KACLMhhi9fEq2T5BDQcEyA&s", // Placeholder image of a product
    title: "Elegant Wooden Chair",
    price: 5999,
    comparedPrice: 7999, // Comparison price, set to undefined if not applicable
    collection: "Furniture",
  };


  return (
    <main className="my-8 ">
      <h1 className="text-5xl text-left   px-6">Orders</h1>

      <section className="my-8 md:w-[80vw]">
        <div className="w-full text-left flex justify-start py-10 flex-col px-6 gap-4">
          <h3 className="text-xl">
          Select orders date: 

          </h3>
          <div className="flex gap-10">
            <div className=" w-1/4">
              From: 
              <DatePicker dateReturner={setFromDate}  allowPast={true} />

            </div>
            <div className=" w-1/4">
              To: 
              <DatePicker dateReturner={setToDate} allowPast={true} />

            </div>
          </div>
          </div>
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" className="p-4">
                
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Status
              </th>
              
              <th scope="col" className="px-4 py-3">
                Phone
              </th>
              <th scope="col" className="px-4 py-3">
                Amount
              </th>
              <th scope="col" className="px-4 py-3">
                Order Date
              </th>
            </tr>
            </thead>
          {initialLoading ? (
            <>
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
            </>
          ) : (orders.map((order, i) => {
            const timeStamp = order.createdAt.toDate(); // Convert Firestore Timestamp to JS Date
            const formattedDate = timeStamp.toLocaleDateString(); // Format the date, you can use .toLocaleString() for time too
          
            return (
              <AdminOrderCard
                key={i}
                isLoading={false}
                customerName={order.customer.firstName}
                customerPhone={order.customer.phoneNumber}
                orderStatus={order.status}
                orderDate={formattedDate} // Pass formatted date to the component
                orderTotal={2400}
                orderDetailsObj={order}
              />
            );
          })
          )}
          <div ref={loader} />
        {loading && <>
          <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} />
              <AdminOrderCard loading={true} /></> }
          </table>
        </div>
      </section>
    </main>
  );
};

export default AdminOrdersPage;
