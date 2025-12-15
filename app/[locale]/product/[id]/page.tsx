import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductClient from './../../../components/product/ProductClient';
export default async function ProductPage({
  params,
}: {
  params: Promise < { locale: string; id: string }>;
}) {
  const { locale, id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <ProductClient
      product={product}
      relatedProducts={relatedProducts}
      locale={locale}
    />
  );
}
