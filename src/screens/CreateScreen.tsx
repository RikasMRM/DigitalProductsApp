import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  FormControl,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Image,
  ButtonText,
  InputField,
  Textarea,
  TextareaInput,
} from '@gluestack-ui/themed';
import { launchImageLibrary } from 'react-native-image-picker';
import { addProduct } from '../store/slices/productSlice';
import { Product } from '../types';
import { nanoid } from '@reduxjs/toolkit';
import type { CreateScreenProps } from '../navigation/types';

export const CreateScreen: React.FC<CreateScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    coverPhotos: [] as string[],
  });

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });

    if (result.assets) {
      const photos = result.assets.map(asset => asset.uri || '');
      setFormData(prev => ({
        ...prev,
        coverPhotos: [...prev.coverPhotos, ...photos].slice(0, 5),
      }));
    }
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      id: nanoid(),
      ...formData,
      price: parseFloat(formData.price) || 0,
      benefits: [],
      additionalDetails: [],
    };

    dispatch(addProduct(newProduct));
    navigation.navigate('Products');
  };

  return (
    <Box flex={1} p="$4" bg="$white">
      <VStack space="md">
        <Text size="xl" fontWeight="bold">About</Text>

        <FormControl>
          <FormControl.Label>
            <Text>Name</Text>
          </FormControl.Label>
          <Input>
            <InputField
              placeholder="Enter product name"
              value={formData.name}
              onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            />
          </Input>
        </FormControl>

        <FormControl>
          <FormControl.Label>
            <Text>Description</Text>
          </FormControl.Label>
          <Textarea h={100}>
            <TextareaInput
              placeholder="Enter product description"
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
            />
          </Textarea>
        </FormControl>

        <FormControl>
          <FormControl.Label>
            <Text>Cover photos (Upload up to 5 photos)</Text>
          </FormControl.Label>
          <HStack flexWrap="wrap" space="sm">
            {formData.coverPhotos.map((photo, index) => (
              <Box
                key={index}
                width={100}
                height={100}
                borderRadius="$sm"
                overflow="hidden"
                borderWidth={1}
                borderColor="$gray200"
              >
                <Image
                  source={{ uri: photo }}
                  alt={`Cover photo ${index + 1}`}
                  width={100}
                  height={100}
                />
              </Box>
            ))}
            {formData.coverPhotos.length < 5 && (
              <Button
                onPress={handleImagePicker}
                variant="outline"
                width={100}
                height={100}
                justifyContent="center"
                alignItems="center"
              >
                <ButtonText>+</ButtonText>
              </Button>
            )}
          </HStack>
        </FormControl>

        <FormControl>
          <FormControl.Label>
            <Text>Price</Text>
          </FormControl.Label>
          <Input>
            <InputField
              placeholder="Enter price"
              value={formData.price}
              keyboardType="numeric"
              onChangeText={(text) => setFormData(prev => ({ ...prev, price: text }))}
            />
          </Input>
        </FormControl>

        <Button
          onPress={handleSubmit}
          isDisabled={!formData.name || !formData.description || !formData.price}
          mt="$4"
        >
          <ButtonText>Next</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
};
