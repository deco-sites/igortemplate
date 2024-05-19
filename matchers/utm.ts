import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  utmcampaign: string;
}

export default function UtmCampaign(props: Props, ctx: MatchContext) {
  const url = new URL(ctx.request.url);

  return (
    url.searchParams.get("utm_campaign")?.includes(props.utmcampaign) ??
      false
  );
}
