import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Spinner from "deco-sites/igortemplate/components/ui/Spinner.tsx";

export interface Props {
  error: {
    fallbackImage: ImageWidget;
    title: string;
    description: string;
  };
  product: ProductDetailsPage | null;
}

function formatCurrency(price: number | undefined) {
  if (!price) {
    return undefined;
  }
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
}

function getProductProps(productDetails: ProductDetailsPage) {
  const { product } = productDetails;
  return {
    image: product?.image,
    url: product?.url,
    description: product?.description,
    name: product?.name,
    offers: product?.offers,
  };
}

export function ErrorFallback(props: Props) {
  return (
    <div className="flex items-center lg:items-start justify-start">
      <img
        src={props.error.fallbackImage}
        width={200}
        height={200}
        alt={props.error.title}
      />
      <span>{props.error.title}</span>
      <span>{props.error.description}</span>

      <a
        href="/culture"
        title="Learn more"
        className="underline text-blue-500 font-thin text-sm"
      >
        To learn more about us!
      </a>
    </div>
  );
}

export function LoadingFallback() {
  return <Spinner size={24} />;
}

export default function HorizontalProductCard(props: Props) {
  if (!props?.product) {
    return null;
  }

  const { image, url, description, name, offers } = getProductProps(
    props.product,
  );

  const priceIsDiferent = offers?.lowPrice !== offers?.highPrice;

  return (
    <div className="w-full h-auto flex items-center justify-center my-2">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center border-black rounded border px-2 py-2 bg-gray-800 gap-4">
        <img
          src={image?.[0].url}
          height={100}
          width={100}
          className="hidden lg:block"
        />
        <img
          src={image?.[0].url}
          height={200}
          width={200}
          className="block lg:hidden"
        />

        <div className="flex flex-col items-start text-white">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>

        <div class="flex flex-col items-start justify-between text-white">
          {priceIsDiferent && <span>{formatCurrency(offers?.lowPrice)}</span>}
          <span className={`${priceIsDiferent ? "text-red-50" : ""}`}>
            <s>{formatCurrency(offers?.highPrice)}</s>
          </span>

          <a
            href={url}
            className="text-white px-2 py-2 bg-red-500 hover:bg-red-700 transition:ease-in-out"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
}
