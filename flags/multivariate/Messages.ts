export {onBeforeResolveProps} from 'apps/website/utils/multivariate.ts';

import {MultivariateFlag} from 'deco/blocks/flag.ts';
import multivariate, {
  MultivariateProps,
} from 'apps/website/utils/multivariate.ts';

export type Messages = {
  text1: string;
  text2: string;
};

/*
 * @title Message Variantes
 */
export default function Message(
  props: MultivariateProps<Messages>,
): MultivariateFlag<Messages> {
  return multivariate(props);
}
