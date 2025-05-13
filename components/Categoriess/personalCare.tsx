// import AntDesign from '@expo/vector-icons/AntDesign';
// import React from 'react';
// import { FlatList, Image, ScrollView, Text, View } from 'react-native';
// import Womencare from "./womenCare";
// export default function PersonalCare() {
   
//         const categoriesWomen = [{
//             name: 'Supplements',
//             Icon: <Image source={require('../../assets/images/Categories/supplement.png') } style={{height:50,width:50}} />,
//             // link: '/Profile/edit',
//           },
//           {
//             name: 'Beauty',
//             Icon: <Image source={require('../../assets/images/Categories/beauty.png') } style={{height:50,width:50}} />,
//             // link: '/Profile/edit',
//           },
//           {
//             name: 'Hair Care',
//             Icon: <Image source={require('../../assets/images/Categories/haircare.png') } style={{height:50,width:50}} />,
//             // link: '/Profile/edit',
//           },
//           {
//             name: 'Sanitary Pads',
//             Icon: <Image source={require('../../assets/images/Categories/sanitarypads.png') } style={{height:50,width:50}} />,
//             // link: '/Profile/edit',
//           },
//         ]
//   return (
//     <View>
//      <ScrollView>
//         <View style={{flexDirection:"row",paddingHorizontal:12, marginTop:10}}>
//             <Text style={{flex:1,fontWeight:500,fontSize:20}}>Personal Care</Text>
//             <Text style={{fontWeight:500,fontSize:20,color:"#00a99d"}}>See All <AntDesign name="arrowright" size={24} color="#00a99d" /> </Text>
//         </View>
//          <View style={{flexDirection:'row'}}>
//              <FlatList
//              data={categoriesWomen}
//              keyExtractor={(item)=>item.name}
//              renderItem={({item})=>(
//                  <Womencare 
//                  name={item.name}
//                  Icon={item.Icon}
//                  />
                 
     
//              )}
//              numColumns={4}
//            contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
//              scrollEnabled={false}
//            />
//          </View>
//          </ScrollView>

//     </View>
//   )
// }