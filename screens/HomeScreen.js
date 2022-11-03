import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { UserIcon, ChevronDownIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';





const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type == "featured"] {
            ...,
            restaurants[]->{
                ...,
                dishes[]->
            } 
        }
        `).then(data => {
            setFeaturedCategories(data);
        });
    }, []);

  return (
    <SafeAreaView className="bg-white pt-5 pb-20">
        <View className="flex-row mt-5 ml-4 p-3 items-center mx-4 space-x-2">
          <Image source={{uri: 'https://links.papareact.com/wru'}} className='h-7 w-7 bg-gray-300 p-4 rounded-full' />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className='font-bold text-xl'>
                Current Location
                <ChevronDownIcon size={20} color="#00CCBB" />  
            </Text>
          </View>
          <UserIcon size={35} color="#00CCBB"/>
        </View>
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
            <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
                <MagnifyingGlassIcon color="gray" size={20} />
                <TextInput placeholder="Search nearby resturants" keyboardType='default'/>
            </View>
            <AdjustmentsHorizontalIcon color="#00CCBB" />
        </View>
        <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom: 100, }} >
            {/* Component Category */}
            <Categories />

            {/* Featured Rows */}

            {featuredCategories?.map((item) => (
                <FeaturedRow 
                key={item._id} 
                id={item._id}  
                title={item.name} 
                description={item.short_description} 
                />
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen