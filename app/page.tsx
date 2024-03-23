
import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousel from "@/components/HeroCarousel"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import AuthForm from "@/components/AuthForms";
import Cookies from "universal-cookie";

const Home = async () => {
  const allProducts = await getAllProducts();
  const cookies = new Cookies();
  let token = cookies.get('sb-access-token');

  console.log(token)
  
  if(token === '' || token === null || token === undefined){
    token = '';
  }

  return (
    <>
      <AuthForm/>
      <>
        <section className="trending-section">
          <h2 className="section-text">Trending</h2>

          <div className="flex flex-wrap gap-x-8 gap-y-16">
            {allProducts?.map ((product) => (
            <ProductCard key={product._id} product={product} />
            ))}

          </div>

        </section>
      </>
    </>
  )
}

export default Home