export interface IOrderToast {
  warning: string;
}

export const OrderToast = ({ warning }: IOrderToast) => (
  <div
    style={{
      backgroundColor: '#fee500',
      color: '#111',
      height: '60px',
      position: 'fixed',
      top: '60px',
      left: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '10px',
      padding: '10px',
      textAlign: 'center',
      textWrap: 'nowrap',
    }}
  >
    {warning}
  </div>
);
