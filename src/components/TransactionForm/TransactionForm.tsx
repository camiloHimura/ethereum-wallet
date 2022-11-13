import { FormEventHandler, useEffect, useState } from 'react';

import { Heading, Flex, TextField, Form, NumberField, Button, Well, StatusLight } from '@adobe/react-spectrum';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { TransactionState, TransactionStatus } from '@usedapp/core';
import { utils } from 'ethers';

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

interface TransactionFormProps {
    title: string;
    state: TransactionStatus;
    send: (...args: unknown[]) => Promise<TransactionReceipt | undefined>;
}

export const TransactionForm = ({ title, state, send }: TransactionFormProps) => {
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
        <>
            <Heading level={2}>{title}</Heading>
            {isStatusVisible && <StatusLight variant={getStatusVariant(state.status)}>{state.status}</StatusLight>}

            <Form onSubmit={onSubmit} isDisabled={isSending} aria-label='transaction form'>
                <TextField label='Address' isRequired onChange={setAddress} aria-label='address' />
                <NumberField label='Amount (wei)' isRequired onChange={setAmount} aria-label='amount' />

                <Button variant='secondary' type='submit' isDisabled={address === '' || amount === 0 || isSending}>
                    Submit
                </Button>
            </Form>
            {activateError && <Well marginTop={'size-250'}>{activateError}</Well>}
        </>
    );
};
