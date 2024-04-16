import {ProductDetailsPage} from 'apps/commerce/types.ts';
import ProductDetails from 'deco-sites/igortemplate/sections/Product/ProductDetails.tsx';
import ImageGallerySlider from 'deco-sites/igortemplate/components/product/Gallery/ImageSlider.tsx';
import ProductInfo from 'deco-sites/igortemplate/components/product/ProductInfo.tsx';

export interface Props {
  page: ProductDetailsPage;
}

export default function HorizontalProductCard(props: Props) {
  return (
    <div className="w-full">
      <div className="lg:hidden md:flex flex-col">
        <ImageGallerySlider page={props.page} />
        <ProductInfo page={props.page} />
      </div>

      <div className="lg:flex md:hidden items-start justify-center">
        <ProductDetails page={props.page} />
      </div>
    </div>
  );
}
