import { View, Text, ScrollView, Image, FlatList, Dimensions, Platform, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { getPropertyById } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { facilities } from '@/constants/data'
import Comment from '@/components/Comment'

const windowHeight = Dimensions.get('window').width
const Property = () => {

    const {id} = useLocalSearchParams<{id?: string}>()

    const {data: property} = useAppwrite({
      fn:getPropertyById,
      params: {
        id: id!
      },
    })

    const [isBottom, setIsBottom] = useState(false)
  const scrollViewRef = useRef<ScrollView>(null)

  // Function to detect if user scrolled to the bottom
  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    setIsBottom(isAtBottom)
  }

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensures smooth scroll detection
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 bg-white'
      >
        <View className='relative w-full' style={{height: windowHeight / 2}}>
          
          <Image source={{uri: property?.image}} className='size-full' resizeMode='cover'/>
          <Image source={images.whiteGradient} className='absolute top-0 w-full z-40'/>

          <View className='z-50 absolute inset-x-7' style={{top: Platform.OS === 'ios'? 70 : 20}}>
            <View className='flex flex-row  items-center justify-between w-full'>
              <TouchableOpacity className='flex flex-row rounded-full items-center justify-center' onPress={() => router.back()}>
                <Image source={icons.backArrow} className='size-7'/>
              </TouchableOpacity>
              <View className='flex flex-row gap-5 items-center'>
                <Image source={icons.heart} className='size-7' tintColor={'#191d31'}/>
                <Image source={icons.send} className='size-7'/>
              </View>
            </View>
          </View>
        </View>

        {/* Price section */}
          <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-l border-primary-200 p-7'>
            <View className='flex flex-row items-center justify-between gap-10'>
              <View className='flex flex-col justify-start gap-1'>
                <Text className=' uppercase font-rubik-medium text-xs text-black-200'>Price</Text>
                <Text  numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">$ {property?.price}</Text>
              </View>

              
              <TouchableOpacity className='flex-1 flex flex-row rounded-full bg-primary-300 py-2 items-center justify-center shadow-md shadow-zinc-400'>
                <Text className="text-white text-lg text-center font-rubik-bold">Book Now</Text>
              </TouchableOpacity>
              
            </View>
          </View>

        {/* Title and properties */}
        <View className=' mt-7 flex gap-2 px-7'>
          <Text className='font-rubik-bold text-2xl'>{property?.name}</Text>

          <View className='flex flex-row gap-5 items-center mt-2 gap-3'>
            <View className='flex flex-row rounded-full bg-primary-100 px-4 py-2'>
              <Text className='uppercase text-xs font-rubik-bold text-primary-300'>{property?.type}</Text>
            </View>
            
            <View className='flex flex-row items-center gap-1'>
              <Image source={icons.star} className='size-5'/>
              <Text>{property?.rating} ({property?.reviews.length} reviews)</Text>
            </View>
          </View>

          <View className='flex flex-row items-center mt-5'>
            <View className='flex flex-row items-center mr-3'>
              <View className='flex flex-row items-center bg-primary-100 rounded-full size-10 justify-center'>
                <Image source={icons.bed} className='size-5'/>
              </View>
              <Text className='font-rubik-medium text-sm ml-1'>{property?.bedrooms} beds</Text>
            </View>

            <View className='flex flex-row items-center mr-3'>
              <View className='flex flex-row items-center bg-primary-100 rounded-full size-10 justify-center'>
                <Image source={icons.bath} className='size-5'/>
              </View>
              <Text className='font-rubik-medium text-sm ml-1'>{property?.bathrooms} baths</Text>
            </View>
            
            <View className='flex flex-row items-center mr-3'>
              <View className='flex flex-row items-center bg-primary-100 rounded-full size-10 justify-center'>
                <Image source={icons.area} className='size-5'/>
              </View>
              <Text className='font-rubik-medium text-sm ml-1'>{property?.area} sqft</Text>
            </View>

          </View>
        </View>

        {/* Agent */}
        <View className='w-full border-t border-primary-200 mt-5 pt-7 px-7'>
          <Text className='font-rubik-bold text-xl text-black-300'>Agent</Text>


          <View className='flex flex-row items-center justify-between mt-5 '>
            <View className='fex flex-row items-center'>
              <Image source={{uri: property?.agent.avatar}} className='rounded-full size-14'/>
              
              <View className='flex flex-col items-start justify-center ml-3'>
                <Text className='text-lg text-black-200 text-start font-rubik-bold'>{property?.agent.name}</Text>
                <Text className='text-sm text-black-200 text-start font-rubik-medium'>{property?.agent.email}</Text>
              </View>
            </View>

            <View className='flex flex-row items-center gap-3'>
              <Image source={icons.chat} className='size-7'/>
              <Image source={icons.phone} className='size-7'/>
            </View>
          </View>
        </View>
        

        {/* Overview */}
        <View className='mt-7 px-7'>
          <Text className='font-rubik-bold text-xl text-black-300'>Overview</Text>
          <Text className='font-rubik text-base text-black-200'>{property?.description}</Text>
        </View>

        {/* Facilities */}
        <View className='mt-7 mb-7 px-7'>
          <Text className='font-rubik-bold text-xl text-black-300'>Facilities</Text>
          
          {property?.facilities.length > 0 && (
            <View className='flex flex-row flex-wrap items-start justify-start mt-2 gap-5'>
              {property?.facilities.map((item: string, index: number) => {
                const facility = facilities.find(
                  (facility) => facility.title === item
                )

                return(
                    <View key={index} className='flex flex-1 flex-col items-center min-w-16 max-w-20'>
                      <View className='size-14 bg-primary-100 rounded-full flex items-center justify-center'>
                        <Image source={facility ? facility.icon : icons.info} className='size-5'/>
                      </View>

                      <Text numberOfLines={1} ellipsizeMode='tail'>{item}</Text>
                    </View>
                )
              })}
            </View>
          )}
        </View>

          {/* Gallery rooms */}
        {property?.gallery.length > 0 && (
            <View className="mt-7 px-5">
              <Text className="text-black-300 text-xl font-rubik-bold">
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
                contentContainerClassName="flex gap-4 mt-3"
              />
            </View>
          )}

          {/* Location  */}

          <View className='mt-7 px-7'>
            <Text className='font-rubik-bold text-xl text-black-300'>Location</Text>

            <View className='flex flex-row items-center justify-start mt-4 gap-3'>
              <Image source={icons.location} className='size-7'/>
              <Text className='font-rubik-medium tet-sm text-black-100'> {property?.address}</Text>
            </View>

            <Image source={images.map} className='h-52 w-full rounded-xl mt-5'/>
          </View>

          {/* Review section */}
          {property?.reviews.length > 0 && (
            <View className="mt-7 px-5">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center">
                  <Image source={icons.star} className="size-6" />
                  <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity onPress={() => router.push(`/properties/${property?.$id}/reviews`)}>
                  <Text className="text-primary-300 text-base font-rubik-bold">
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-5">
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}

          {/* Price section */}
          {isBottom && (
            <View className='absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-l border-primary-200 p-7'>
              <View className='flex flex-row items-center justify-between gap-10'>
                <View className='flex flex-col justify-start gap-1'>
                  <Text className=' uppercase font-rubik-medium text-xs text-black-200'>Price</Text>
                  <Text  numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">$ {property?.price}</Text>
                </View>

                
                <TouchableOpacity className='flex-1 flex flex-row rounded-full bg-primary-300 py-2 items-center justify-center shadow-md shadow-zinc-400'>
                  <Text className="text-white text-lg text-center font-rubik-bold">Book Now</Text>
                </TouchableOpacity>
                
              </View>
            </View>
          )}

      </ScrollView>

      {/* Sticky Price Section when scrolling */}
      {!isBottom && (
            <View className="absolute bottom-0 w-full bg-white p-7 border-t border-primary-200 shadow-md">
              <View className="flex flex-row items-center justify-between gap-10">
                <View className="flex flex-col justify-start gap-1">
                  <Text className="uppercase font-rubik-medium text-xs text-black-200">Price</Text>
                  <Text numberOfLines={1} className="text-primary-300 text-start text-2xl font-rubik-bold">$ {property?.price}</Text>
                </View>
                <TouchableOpacity className="flex-1 flex flex-row rounded-full bg-primary-300 py-2 items-center justify-center shadow-md shadow-zinc-400">
                  <Text className="text-white text-lg text-center font-rubik-bold">Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

    </View>
  )
}

export default Property