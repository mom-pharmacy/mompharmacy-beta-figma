// import { AntDesign } from '@expo/vector-icons'
// import React from 'react'
// import { FlatList, Image, ScrollView, Text, View } from 'react-native'
// import Womencare from './womenCare'

// export default function bodyCare() {
//   const categoriesWomen = [{
//     name: 'Baby Oil',
//     Icon: <Image source={require('../../assets/images/Categories/babyoil.png')} style={{ height: 50, width: 50 }} />,
//     // link: '/Profile/edit',
//   },
//   {
//     name: 'Diaper',
//     Icon: <Image source={require('../../assets/images/Categories/diaper.png')} style={{ height: 50, width: 50 }} />,
//     // link: '/Profile/edit',
//   },
//   {
//     name: 'Baby Soap',
//     Icon: <Image source={require('../../assets/images/Categories/bodysoap.png')} style={{ height: 50, width: 50 }} />,
//     // link: '/Profile/edit',
//   },
//   {
//     name: 'Baby Foods',
//     Icon: <Image source={require('../../assets/images/Categories/babyfood.png')} style={{ height: 50, width: 50 }} />,
//     // link: '/Profile/edit',
//   },
//   ]
//   return (
//     <View>
//       <ScrollView>
//         <View style={{ flexDirection: "row", paddingHorizontal: 12, }}>
//           <Text style={{ flex: 1, fontWeight: 500, fontSize: 20 }}>Boby Care</Text>
//           <Text style={{ fontWeight: 500, fontSize: 20, color: "#00a99d" }}>See All <AntDesign name="arrowright" size={24} color="#00a99d" /> </Text>
//         </View>
//         <View style={{ flexDirection: 'row' }}>
//           <FlatList
//             data={categoriesWomen}
//             keyExtractor={(item) => item.name}
//             renderItem={({ item }) => (
//               <Womencare
//                 name={item.name}
//                 Icon={item.Icon}
//               />


//             )}
//             numColumns={4}
//             contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
//             scrollEnabled={false}
//           />
//         </View>
//       </ScrollView>

//     </View>
//   )
// }