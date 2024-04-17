import { ImageWidget } from "apps/admin/widgets.ts";
import { AppContext } from "deco-sites/igortemplate/apps/site.ts";
import { signal } from "@preact/signals";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";

export interface Props {
  images: ImageWidget[];
  page: number;
  title: string;
}

export function ErrorFallback() {
  return (
    <div className="w-[90%] h-auto border border-red-100 rounded">
      <h2 className="text-lg text-black underline">Component Error</h2>
      <p className="text-black text-justify">
        This components requires three or more images
      </p>
    </div>
  );
}

export const loader = (props: Props, _: Request, ctx: AppContext) => {
  if (props.images.length < 3) {
    ctx.response.status = 500;
  }

  return props;
};

export default function PartialImageGallery(props: Props) {
  const images = signal<string[]>(props.images);
  const limitedImages = signal<string[] | undefined>(undefined);

  if (props.images.length < 3) {
    return null;
  }

  limitedImages.value = images.value.slice(0, props.page * 3);

  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <h2 className="text-black text-lg text-center w-full underline">
        {props.title}
      </h2>
      <div className="flex flex-wrap items-start justify-start gap-2">
        {limitedImages.value.map((image, i) => (
          <img src={image} alt={`image-${i}`} width={200} height={200} />
        ))}
      </div>

      {images.value.length > 3 && (
        <button
          className="text-white bg-blue-600 rounded px-2 py-2"
          {...usePartialSection({
            props: {
              page: props.page + 1,
            },
          })}
        >
          Fetch More
        </button>
      )}
    </div>
  );
}
