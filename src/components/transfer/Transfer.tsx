import './Transfer.scss';

import { View } from '@adobe/react-spectrum';
import { Contract } from '@ethersproject/contracts';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';

import { contractAddress, contracAbi } from '../../contans/smart-contract';
import { TransactionForm } from '../TransactionForm/TransactionForm';

const wethInterface = new utils.Interface(contracAbi);
const contract = new Contract(contractAddress, wethInterface);

export const Transfer = () => {
    const contractData = useContractFunction(contract, 'transfer', { transactionName: 'Transfer' });

    return (
        <View
            flexGrow={1}
            borderWidth='thin'
            borderColor='dark'
            marginTop='size-250'
            padding='size-250'
            borderRadius='medium'
        >
            <TransactionForm title={'Transfer'} {...contractData} />
        </View>
    );
};
