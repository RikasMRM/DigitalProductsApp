// src/screens/ProductsScreen.tsx
import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Box,
  Text,
  VStack,
  Image,
  Pressable,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';
import { RootState } from '../store';
import type { ProductsScreenProps } from '../navigation/types';

const windowWidth = Dimensions.get('window').width;

export const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.products);

  const handleCreatePress = () => {
    navigation.navigate('Create');
  };

  return (
    <Box flex={1} bg="$white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack p="$4" flex={1}>
          {products.length === 0 ? (
            <Box flex={1} justifyContent="center" alignItems="center" py="$8">
              <Text size="xl" color="$gray500" mb="$4">No products available</Text>
            </Box>
          ) : (
            products.map((product) => (
              <Pressable
                key={product.id}
                onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                mb="$4"
              >
                <Box
                  borderRadius="$lg"
                  overflow="hidden"
                  borderWidth={1}
                  borderColor="$gray200"
                >
                  <Box position="relative">
                    {product.coverPhotos[0] ? (
                      <Image
                        source={{ uri: product.coverPhotos[0] }}
                        alt={product.name}
                        width={windowWidth - 32}
                        height={200}
                      />
                    ) : (
                      <Box
                        width={windowWidth - 32}
                        height={200}
                        bg="$gray100"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="$gray500">No image available</Text>
                      </Box>
                    )}
                    <Box
                      position="absolute"
                      right="$3"
                      top="$3"
                      bg="$white"
                      borderRadius="$md"
                      px="$2"
                      py="$1"
                    >
                      <Text fontWeight="bold">
                        ${product.price.toFixed(2)}
                      </Text>
                    </Box>
                  </Box>
                  <Box p="$3">
                    <Text size="lg" fontWeight="medium">
                      {product.name}
                    </Text>
                    {product.description && (
                      <Text color="$gray600" numberOfLines={2} mt="$1">
                        {product.description}
                      </Text>
                    )}
                  </Box>
                </Box>
              </Pressable>
            ))
          )}
        </VStack>
      </ScrollView>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$4"
        bg="$white"
        borderTopWidth={1}
        borderTopColor="$gray200"
      >
        <Button
          size="lg"
          onPress={handleCreatePress}
          backgroundColor="$blue500"
        >
          <Plus size={24} color="white" />
          <ButtonText ml="$2">Create New Product</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
