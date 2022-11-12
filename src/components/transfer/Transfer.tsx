import './Transfer.scss';

import { FormEventHandler, useState } from 'react';

import { Contract } from '@ethersproject/contracts';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';

import { contractAddress, contracAbi } from '../../contans/smart-contract';

const wethInterface = new utils.Interface(contracAbi);
const contract = new Contract(contractAddress, wethInterface);

export const Transfer = () => {
    //Todo add state.errorMessage and show it to the user
    const { state, send } = useContractFunction(contract, 'transfer', { transactionName: 'Transfer' });
    console.log('transaction state', state);
    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [isSending, setIsSending] = useState(false);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setIsSending(true);
        await send(address, utils.formatUnits(amount, 'wei'));
        setIsSending(false);
    };

    return (
        <div className='transfer'>
            <h2>Transfer</h2>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='addres'
                    placeholder='address'
                    value={address}
                    disabled={isSending}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    step='1'
                    type='number'
                    name='amount'
                    placeholder='0'
                    value={amount}
                    disabled={isSending}
                    onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
                <button type='submit' disabled={isSending}>
                    Submit
                </button>
            </form>
            <div>{state.status}</div>
        </div>
    );
};
