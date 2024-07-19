type Props = {
  name: string;
  price: number;
};

export const Aside = ({ name, price }: Props) => {
  return (
    <aside>
      <div>
        <div>
          <p>{name}</p>
          <div>
            <button></button>
            <input type="text" />
            <button></button>
          </div>
        </div>
        <div>
          <div>
            총 결제 금액<span>{price}원</span>
          </div>
          <button></button>
        </div>
      </div>
    </aside>
  );
};
