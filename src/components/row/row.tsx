import './row.scss';

interface RwoProps {
    data: [number, number, number];
}

export const Row = ({ data }: RwoProps) => {
    const [price, count, amount] = data;

    return (
        <div className='booksRow'>
            <div>{price}</div>
            <div>{count}</div>
            <div>{amount}</div>
            <div></div>
        </div>
    );
};
