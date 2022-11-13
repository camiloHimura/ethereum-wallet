import './Mint.scss';

import { View } from '@adobe/react-spectrum';
import { Contract } from '@ethersproject/contracts';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';

import { contractAddress, contracAbi } from '../../contans/smart-contract';
import { TransactionForm } from '../TransactionForm/TransactionForm';

const wethInterface = new utils.Interface(contracAbi);
const contract = new Contract(contractAddress, wethInterface);

export const Mint = () => {
    const contractData = useContractFunction(contract, 'mint', { transactionName: 'Mint' });

    return (
        <View
            flexGrow={1}
            borderWidth='thin'
            borderColor='dark'
            marginTop='size-250'
            padding='size-250'
            borderRadius='medium'
        >
            <TransactionForm title={'Mint'} {...contractData} />
        </View>
    );
};
