
import { Hero } from "../components/home/Hero";
import { FeaturedCategories } from "../components/home/FeaturedCategories";
import { Featuredproducts } from "../components/home/Featuredproducts";

export default async function Home({ params }: { params: Promise < {locale: string}> } ) {
  console.log("HOME LOCALE ===>", (await params).locale);

  const { locale } = await params;

  return (
    <>
      <Hero  />
      <FeaturedCategories locale={locale} />
      <Featuredproducts locale={locale} />
    </>
  );
}

