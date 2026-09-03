import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import NewDrop from "@/components/NewDrop";
import Lookbook from "@/components/Lookbook";
import Manifesto from "@/components/Manifesto";
import { lookbook } from "@/lib/products";

/* Newsletter and Footer close every route and live in the layout. */
export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <NewDrop />
      <Lookbook shots={lookbook} />
      <Manifesto />
    </>
  );
}
