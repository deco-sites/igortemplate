import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Spinner from "deco-sites/igortemplate/components/ui/Spinner.tsx";
import ProductVote from "deco-sites/igortemplate/islands/Votes/ProductVote.tsx";

export interface Props {
  error: {
    fallbackImage: ImageWidget;
    title: string;
    description: string;
  };
  product: ProductDetailsPage | null;
  maxWidth?:
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-full";
  animateImage?: boolean;
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
  const componentClass =
    "h-full flex flex-row items-start justify-center border-black rounded border px-2 py-2 bg-gray-800 gap-4 w-full " +
    props?.maxWidth;

  return (
    <div className="h-auto flex items-center justify-center my-2 w-full">
      <div className={componentClass}>
        <img
          src={image?.[0].url}
          height={200}
          width={200}
          className={props.animateImage
            ? "hidden lg:block transition hover:scale-110"
            : "hidden lg:block"}
        />
        <img
          src={image?.[0].url}
          height={100}
          width={100}
          className="block lg:hidden"
        />

        <div className="h-full flex flex-col items-start justify-between text-white">
          <div>
            <h2 className="overflow-ellipsis truncate font-bold max-w-[100px] lg:max-w-[200px]">
              {name}
            </h2>
            <p className="max-w-[100px] lg:max-w-[200px] line-clamp-2 lgline-clamp-4 overflow-ellipsis">
              {description}
            </p>
          </div>

          <div className="flex flex-col items-start justify-start gap-2 mt-4">
            <span className="text-white underline-offset-2 text-sm">
              Do you like this product? Leave a vote for it!
            </span>
            <ProductVote productId={Number(props.product.product.productID)} />
          </div>
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
