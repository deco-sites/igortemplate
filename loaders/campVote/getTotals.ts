import {AppContext} from 'deco-sites/igortemplate/apps/site.ts';

export interface Result {
  total: number;
}

export default async function getTotalVotes(
  _: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Result> {
  const response = await fetch('https://camp-api.deco.cx/events', {
    headers: {
      'x-api-key': ctx.secretCampApi.get(),
    } as Record<string, string>,
  });

  const data = (await response.json()) as Result;
  return data;
}
