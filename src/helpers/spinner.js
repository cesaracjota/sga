import { Center, Flex, Stack } from "@chakra-ui/react";

import { Spinner } from "react-loading-io";

export function SpinnerComponent () {

    return (
        <Flex alignItems="center" h={'70vh'} w={'full'} justifyContent="center">
            <Center>
                <Stack spacing={4} px={4} direction="column" align={'center'}>
                    <Spinner
                        size={250}
                        type="ball-spin-fade-loader"
                        color="#805ad5"
                    />
                </Stack>
            </Center>
        </Flex>
    )
}