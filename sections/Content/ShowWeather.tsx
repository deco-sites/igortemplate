import {AppContext} from 'deco-sites/igortemplate/apps/site.ts';
import {Temperature} from 'apps/weather/loaders/temperature.ts';
import Spinner from 'deco-sites/igortemplate/components/ui/Spinner.tsx';

export interface Props {
  weather: Temperature | null;
}

export function ErrorFallback({error}: {error?: Error}) {
  return <div>Deu Ruim: {error?.message}</div>;
}

export function LoadingFallback() {
  return (
    <div className="border-black rounded-full px-2 py-2 text-black">
      <Spinner size={24} />
    </div>
  );
}

export const loader = (props: Props, _: Request, ctx: AppContext) => {
  if (!props.weather?.celsius) {
    ctx.response.status = 404;
  }

  return props;
};

export default function ShowWeather(props: Props) {
  const {weather} = props;

  return (
    <div className="fixed bottom-1 right-1 bg-black border-black border rounded-full px-2 py-2 text-white font-bold">
      {weather?.celsius} °C{' '}
    </div>
  );
}
