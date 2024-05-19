export { onBeforeResolveProps } from "apps/website/utils/multivariate.ts";

import { MultivariateFlag } from "deco/blocks/flag.ts";
import multivariate, {
  MultivariateProps,
} from "apps/website/utils/multivariate.ts";
import {Props} from "deco-sites/igortemplate/sections/Product/HorizontalProductCard.tsx";

/*
 * @title Message Variantes
 */
export default function HorizontalProductCard(
  props: MultivariateProps<Props>,
): MultivariateFlag<Props> {
  return multivariate(props);
}
