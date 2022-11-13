import './Transfer.scss';

import { FormEventHandler, useEffect, useState } from 'react';

import { Heading, Flex, TextField, Form, NumberField, View, Button, Well, StatusLight } from '@adobe/react-spectrum';
import { Contract } from '@ethersproject/contracts';
import { useContractFunction, TransactionState } from '@usedapp/core';
import { utils } from 'ethers';

import { contractAddress, contracAbi } from '../../contans/smart-contract';

const wethInterface = new utils.Interface(contracAbi);
const contract = new Contract(contractAddress, wethInterface);

export const getStatusVariant = (state: TransactionState) => {
    if (state === 'Success') {
        return 'positive';
    }
    if (state === 'Exception' || state === 'Fail') {
        return 'negative';
    }
    if (state === 'Mining' || state === 'CollectingSignaturePool') {
        return 'info';
    }

    return 'notice';
};

export const Transfer = () => {
    const { state, send } = useContractFunction(contract, 'transfer', { transactionName: 'Transfer' });

    const [amount, setAmount] = useState(0);
    const [address, setAddress] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [activateError, setActivateError] = useState<null | string>(null);
    const isStatusVisible = state.status != 'None';

    useEffect(() => {
        state.errorMessage && setActivateError(state.errorMessage);
    }, [state.errorMessage]);

    const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setIsSending(true);
        setActivateError(null);

        try {
            await send(address, utils.formatUnits(amount, 'wei'));
        } catch (e) {
            const error = e as Error;
            error?.message && setActivateError(error?.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <View borderWidth='thin' borderColor='dark' marginTop={'size-250'} borderRadius='medium' padding='size-250'>
            <Heading level={2}>Transfer</Heading>
            {isStatusVisible && <StatusLight variant={getStatusVariant(state.status)}>{state.status}</StatusLight>}

            <Flex direction='row' gap='size-250'>
                <Form onSubmit={onSubmit} isDisabled={isSending} aria-label='transaction form'>
                    <TextField label='Address' isRequired onChange={setAddress} aria-label='address' />
                    <NumberField label='Amount (wei)' isRequired onChange={setAmount} aria-label='amount' />

                    <Button variant='secondary' type='submit' isDisabled={address === '' || amount === 0 || isSending}>
                        Submit
                    </Button>
                </Form>
            </Flex>
            {activateError && <Well marginTop={'size-250'}>{activateError}</Well>}
        </View>
    );
};
