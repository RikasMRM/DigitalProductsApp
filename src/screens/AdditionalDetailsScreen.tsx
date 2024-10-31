import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  InputField,
  Button,
  ButtonText,
  Pressable,
} from '@gluestack-ui/themed';
import { Trash2 } from 'lucide-react-native';
import { RootState } from '../store';
import { updateProduct } from '../store/slices/productSlice';
import type { AdditionalDetailsScreenProps } from '../navigation/types';
import { nanoid } from '@reduxjs/toolkit';

export const AdditionalDetailsScreen: React.FC<AdditionalDetailsScreenProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { productId } = route.params;
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === productId)
  );

  const [benefits, setBenefits] = useState(product?.benefits || []);
  const [additionalDetails, setAdditionalDetails] = useState(product?.additionalDetails || []);
  const [newBenefit, setNewBenefit] = useState('');
  const [newDetail, setNewDetail] = useState({ attribute: '', value: '' });

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setBenefits([...benefits, { id: nanoid(), text: newBenefit.trim() }]);
      setNewBenefit('');
    }
  };

  const handleRemoveBenefit = (id: string) => {
    setBenefits(benefits.filter(b => b.id !== id));
  };

  const handleAddDetail = () => {
    if (newDetail.attribute.trim() && newDetail.value.trim()) {
      setAdditionalDetails([...additionalDetails, {
        id: nanoid(),
        attribute: newDetail.attribute.trim(),
        value: newDetail.value.trim(),
      }]);
      setNewDetail({ attribute: '', value: '' });
    }
  };

  const handleRemoveDetail = (id: string) => {
    setAdditionalDetails(additionalDetails.filter(d => d.id !== id));
  };

  const handleSave = () => {
    if (product) {
      dispatch(updateProduct({
        ...product,
        benefits,
        additionalDetails,
      }));
      navigation.goBack();
    }
  };

  return (
    <Box flex={1} bg="$white">
      <ScrollView>
        <VStack space="lg" p="$4">
          <Box>
            <Text size="xl" fontWeight="bold">Benefits</Text>
            <VStack space="sm" mt="$2">
              {benefits.map((benefit) => (
                <HStack key={benefit.id} space="sm" alignItems="center">
                  <Text flex={1}>{benefit.text}</Text>
                  <Pressable
                    onPress={() => handleRemoveBenefit(benefit.id)}
                    p="$2"
                  >
                    <Trash2 size={20} color="#EF4444" />
                  </Pressable>
                </HStack>
              ))}
              <HStack space="sm">
                <Input flex={1}>
                  <InputField
                    placeholder="Add a benefit"
                    value={newBenefit}
                    onChangeText={setNewBenefit}
                  />
                </Input>
                <Button onPress={handleAddBenefit}>
                  <ButtonText>Add</ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Box>

          <Box>
            <Text size="xl" fontWeight="bold">Additional Details</Text>
            <VStack space="sm" mt="$2">
              {additionalDetails.map((detail) => (
                <HStack key={detail.id} space="sm" alignItems="center">
                  <Text flex={1}>{detail.attribute}: {detail.value}</Text>
                  <Pressable
                    onPress={() => handleRemoveDetail(detail.id)}
                    p="$2"
                  >
                    <Trash2 size={20} color="#EF4444" />
                  </Pressable>
                </HStack>
              ))}
              <VStack space="sm">
                <Input>
                  <InputField
                    placeholder="Attribute"
                    value={newDetail.attribute}
                    onChangeText={(text) => setNewDetail(prev => ({ ...prev, attribute: text }))}
                  />
                </Input>
                <Input>
                  <InputField
                    placeholder="Value"
                    value={newDetail.value}
                    onChangeText={(text) => setNewDetail(prev => ({ ...prev, value: text }))}
                  />
                </Input>
                <Button onPress={handleAddDetail}>
                  <ButtonText>Add Detail</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </Box>

          <Button
            onPress={handleSave}
            mt="$4"
            bg="$blue500"
          >
            <ButtonText color="$white">Save Changes</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </Box>
  );
};
