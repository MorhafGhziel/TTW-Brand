import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import NewDrop from "@/components/NewDrop";
import Lookbook from "@/components/Lookbook";
import Categories from "@/components/Categories";
import Bestsellers from "@/components/Bestsellers";
import Manifesto from "@/components/Manifesto";
import { getBestsellers, lookbook } from "@/lib/products";

/* Newsletter and Footer close every route and live in the layout. */
export default async function Home() {
  const bestsellers = await getBestsellers();

  return (
    <>
      <Loader />
      <Hero />
      <NewDrop />
      <Lookbook shots={lookbook} />
      <Categories />
      <Bestsellers products={bestsellers} />
      <Manifesto />
    </>
  );
}
