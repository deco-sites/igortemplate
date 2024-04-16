import { MatchContext } from "deco/blocks/matcher.ts";

export interface Props {
  platform: string;
}

export default function Platform(props: Props, ctx: MatchContext) {
  return ctx.request.headers.get("sec-ch-ui-platform")?.includes(
    props.platform,
  ) ?? false;
}
