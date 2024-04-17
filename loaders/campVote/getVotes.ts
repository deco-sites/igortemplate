import { AppContext } from "deco-sites/igortemplate/apps/site.ts";

export interface Props {
  productId: number;
}

export interface Result {
  product: number;
}

export default async function getVotes(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Result> {
  const response = await fetch(
    `https://camp-api.deco.cx/event/${props.productId}`,
    {
      headers: {
        "x-api-key": ctx.secretCampApi.get(),
      } as Record<string, string>,
    },
  );

  const data = (await response.json()) as Result;
  return data;
}
