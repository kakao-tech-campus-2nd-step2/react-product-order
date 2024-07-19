import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

export default ({
    setValue,
    maxValue,
}: {
    setValue?: (value: number) => void;
    maxValue?: number;
}) => {
    const { valueAsNumber, getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            ...(maxValue ? { max: maxValue } : {}),
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
