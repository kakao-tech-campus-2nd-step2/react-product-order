import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

export default ({ setValue }: { setValue?: (value: number) => void }) => {
    const { valueAsNumber, getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
        });

    const inc = getIncrementButtonProps();
    const dec = getDecrementButtonProps();
    const input = getInputProps();
    if (setValue) setValue(valueAsNumber);

    return (
        <HStack maxW="320px">
            <Button {...dec}>-</Button>
            <Input {...input} />
            <Button {...inc}>+</Button>
        </HStack>
    );
};
