import { useSignal } from "@preact/signals";
import { invoke } from "deco-sites/igortemplate/runtime.ts";
import { sendEventCustom } from "deco-sites/igortemplate/sdk/analytics.tsx";
import { IEvent } from "apps/commerce/types.ts";

interface ComponentParams {
  totalVotes: number;
  productVotes: number;
}

interface ComponentAnalytics extends IEvent<ComponentParams> {
  name: "post_score";
}

export interface Props {
  productId: number;
  productVotes?: number;
}

export const loader = async (props: Props) => {
  const response = await invoke[
    "deco-sites/igortemplate"
  ].loaders.campVote.getVotes({ productId: props.productId });

  return {
    productId: props.productId,
    productVotes: response?.product,
  };
};

function ProductVote(props: Props) {
  const isClicked = useSignal<boolean>(false);
  const productVotes = useSignal<number | undefined>(props.productVotes);

  async function handleClick() {
    if (isClicked.value) {
      return;
    }

    isClicked.value = true;
    const { product, total } = await invoke[
      "deco-sites/igortemplate"
    ].actions.createCampVote({ productId: props.productId });

    sendEventCustom<ComponentAnalytics>({
      name: "post_score",
      params: {
        totalVotes: total,
        productVotes: product,
      },
    });

    productVotes.value = product;

    // just for vote more times
    setTimeout(() => {
      isClicked.value = false;
    }, 5000);
  }

  const showClickedIcon = isClicked.value;

  return (
    <div className="flex flex-col items-start justify-start gap-4">
      <button className="rounded w-auto h-auto" onClick={handleClick}>
        {showClickedIcon
          ? (
            <div className="flex gap-2 items-start justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0ffe0f"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mood-check"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18" />
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1" />
                <path d="M15 19l2 2l4 -4" />
              </svg>
              <span className="text-sm text-gray-200 underline">
                Thank you for the vote!
              </span>
            </div>
          )
          : (
            <div className="flex gap-2 items-start justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffff00"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mood-smile"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 10l.01 0" />
                <path d="M15 10l.01 0" />
                <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
              </svg>
              <span className="text-sm text-gray-200 underline">
                Click here for vote!
              </span>
            </div>
          )}
      </button>
      {productVotes && (
        <span className="text-white font-bold">
          Total votes for this product: {productVotes}
          {" "}
        </span>
      )}
    </div>
  );
}

export default ProductVote;
