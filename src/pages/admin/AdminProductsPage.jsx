import { Link } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";

const AdminProductsPage = ()=>{ 
    return (
        <main className="my-8">
            <h1 className="text-5xl text-left   " >Manage Products</h1>
                
            <section className="my-8 md:w-[80vw]">
                <div className="w-full flex md:justify-end">
                <Link to={"/admin/products/new"} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center gap-4">
                <CiSquarePlus className="text-2xl" />
                    Add a new product
                </Link>
                </div>

                <div class="grid gap-4 w-full p-4" style="grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); column-gap: 2rem;">

                </div>
            </section>
        </main>
    )
}

export default AdminProductsPage