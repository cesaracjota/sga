import { Box, Menu, MenuItemOption, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'

export const CardSettings = () => {
  return (
    <>
        <Box>
            <Text fontSize="xl" fontWeight="bold" mb="4">Cambiar Tema</Text>
            <Menu>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="40px">
                    <MenuItemOption 
                        value="1" 
                        color="white" 
                        bg="red.600" 
                        _hover={{ bg: "red.700" }} 
                        _focus={{ bg: "red.700" }} 
                        _active={{ bg: "red.700" }} 
                        _selected={{ bg: "red.700" }} 
                        fontWeight="bold" 
                        fontSize="xl" 
                        textAlign="center" 
                        px={4}
                        py={20}
                        borderRadius="md">
                        Tema 1
                    </MenuItemOption>
                    <MenuItemOption
                        value="2" 
                        color="white"
                        bg="blue.600"
                        _hover={{ bg: "blue.700" }}
                        _focus={{ bg: "blue.700" }}
                        _active={{ bg: "blue.700" }}
                        _selected={{ bg: "blue.700" }} 
                        fontWeight="bold"
                        fontSize="xl" 
                        textAlign="center" 
                        px={4}
                        py={10}
                        borderRadius="md">
                        Tema 2
                    </MenuItemOption>
                    <MenuItemOption
                        value="3" 
                        color="white"
                        bg="green.600"
                        _hover={{ bg: "green.700" }}
                        _focus={{ bg: "green.700" }}
                        _active={{ bg: "green.700" }}
                        _selected={{ bg: "green.700" }} 
                        fontWeight="bold"
                        fontSize="xl" 
                        textAlign="center" 
                        px={4}
                        py={10}
                        borderRadius="md">
                        Tema 3
                    </MenuItemOption>
                </SimpleGrid>
            </Menu>
        </Box>
    </>
  )
}
