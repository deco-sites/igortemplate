import {AppContext} from 'deco-sites/igortemplate/apps/site.ts';

export interface Props {
  productId: number;
}

export interface Result {
  total: number;
  product: number;
}

export default async function createCampVote(
  props: Props,
  _: Request,
  ctx: AppContext,
): Promise<Result> {

  const bodyData = {
    ...props,
  };
  const response = await fetch('https://camp-api.deco.cx/event', {
    method: 'POST',
    headers: {
      'x-api-key': ctx.secretCampApi.get(),
    } as Record<string, string>,
    body: JSON.stringify(bodyData),
  });

  const data = (await response.json()) as Result;

  return data;
}
