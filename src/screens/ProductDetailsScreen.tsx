import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { RootState } from '../store';
import type { ProductDetailsScreenProps } from '../navigation/types';

const windowWidth = Dimensions.get('window').width;

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ navigation, route }) => {
  const { productId } = route.params;
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === productId)
  );

  if (!product) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text>Product not found</Text>
      </Box>
    );
  }

  return (
    <ScrollView>
      <Box flex={1} bg="$white">
        {product.coverPhotos[0] && (
          <Image
            source={{ uri: product.coverPhotos[0] }}
            alt={product.name}
            width={windowWidth}
            height={300}
          />
        )}

        <VStack space="md" p="$4">
          <Text size="2xl" fontWeight="bold">{product.name}</Text>

          <Box bg="$gray100" p="$3" borderRadius="$lg">
            <Text size="2xl" fontWeight="bold">${product.price.toFixed(2)}</Text>
          </Box>

          <Text color="$gray700">{product.description}</Text>

          {product.benefits.length > 0 && (
            <>
              <Text size="xl" fontWeight="bold" mt="$4">Benefits</Text>
              <VStack space="sm">
                {product.benefits.map((benefit) => (
                  <Text key={benefit.id} color="$gray700">
                    • {benefit.text}
                  </Text>
                ))}
              </VStack>
            </>
          )}

          {product.additionalDetails.length > 0 && (
            <>
              <Text size="xl" fontWeight="bold" mt="$4">Additional Details</Text>
              <VStack space="sm">
                {product.additionalDetails.map((detail) => (
                  <HStack key={detail.id} justifyContent="space-between">
                    <Text color="$gray600">{detail.attribute}</Text>
                    <Text>{detail.value}</Text>
                  </HStack>
                ))}
              </VStack>
            </>
          )}

          <Button
            onPress={() => navigation.navigate('AdditionalDetails', { productId })}
            mt="$4"
          >
            <ButtonText>Edit Details</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
};
