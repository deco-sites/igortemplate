export interface Props {
  couponCode: string;
  description: string;
}

export default function Coupon({couponCode, description}: Props) {
  return (
    <section className="w-100 flex">
      <div className="flex flex-col items-start justify-center">
        <p className="text-zinc-400 bold">{couponCode}</p>
        <p className="text-zinc-400">{description}</p>
      </div>
    </section>
  );
}
