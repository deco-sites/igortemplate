export interface Props {
  couponCode: string;
  description: string;
}

export default function Coupon({ couponCode, description }: Props) {
  return (
    <section className="w-full flex">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-black">{description}</p>
        <p className="text-black font-bold">
          Coupon code:{" "}
          <span className="text-red-800 underline">{couponCode}</span>
        </p>
      </div>
    </section>
  );
}
