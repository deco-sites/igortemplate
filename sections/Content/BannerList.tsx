import { Quotes } from "deco-sites/igortemplate/loaders/zenquotes.ts";
import { AppContext } from "deco-sites/igortemplate/apps/site.ts";
import { Messages } from "deco-sites/igortemplate/flags/multivariate/Messages.ts";

export interface ListItem {
  text: string;
  bold?: boolean;
  color?: "text-red-800" | "text-green-800";
}

export interface Props {
  title: Messages;
  description?: string;
  items: ListItem[];
  quote?: Quotes;
}

export function ErrorFallback({ error }: { error?: Error }) {
  return <div>Ihh deu erro ein: {error?.message}</div>;
}

export function LoadingFallback() {
  return <div>Loading...</div>;
}

export const loader = (props: Props, _: Request, ctx: AppContext) => {
  if (!props.quote || props.quote.data.length === 0) {
    ctx.response.status = 404;
  }

  return props;
};

export default function BannerList(props: Props) {
  return (
    <div className="bg-primary">
      <h1>{props.title.text1}</h1>
      {props.description && <p>{props.description}</p>}
      <ul>
        {props.items.map((item, index) => (
          <li key={index} className={`${item.color ?? "text-gray-800"}`}>
            {item.text}
          </li>
        ))}
      </ul>
      {props.quote && <p>{props.quote.data[0]}</p>}
    </div>
  );
}
