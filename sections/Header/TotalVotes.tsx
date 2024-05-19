import { Result } from "deco-sites/igortemplate/loaders/campVote/getTotals.ts";
import Spinner from "deco-sites/igortemplate/components/ui/Spinner.tsx";
// import {invoke} from 'deco-sites/igortemplate/runtime.ts';

interface Props {
  data?: Result;
}

export function ErrorFallback({ error }: { error?: Error }) {
  return <div>Erro: {error?.message}</div>;
}

export function LoadingFallback() {
  return <Spinner size={24} />;
}

export const loader = (props: Props) => {
  if (!props.data) {
    return {
      total: 0,
    };
  }

  return {
    total: props.data.total,
  };
};

export function TotalVotes(props: Props) {
  const { data } = props;
  const total = data?.total;

  return (
    <span className="text-black font-bold">
      Total votes: <span className="text-red-500">{total}</span>
    </span>
  );
}
