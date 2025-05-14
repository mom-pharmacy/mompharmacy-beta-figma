import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Foundation from '@expo/vector-icons/Foundation';
import React from 'react';
import { Dimensions, FlatList, Image, ScrollView, View } from 'react-native';
import BodyStyle from './bodyStyle';

const { width } = Dimensions.get('window'); // Get screen width

export default function body() {
    const all = [
        {
            name: 'Essential',
            sub: 'Medicines',
            Icon: <Image source={require('../../assets/images/medicine.png')} style={{ height: 40, width: 40 }} />,
            link: '/medicinesEssential',
        },
        {
            name: 'Blood',
            sub: 'Donors',
            Icon: <Image source={require('../../assets/images/blood.png')} style={{ height: 40, width: 40 }} />,
            link: '/BloodDonor/front',
        },
        {
            name: 'Lab',
            sub: 'Tests',
            Icon: <Image source={require('../../assets/images/lab.png')} style={{ height: 40, width: 50 }} />,
            link: '/Comingsoon/bloodtest',
        },
        {
            name: 'Hospitals',
            sub: 'Nearby',
            Icon: <FontAwesome6 name="hospital-alt" size={36} color="#007e71" />,
            link: '/Comingsoon/hospital',
        },
        {
            name: 'Doctor',
            sub: 'Consultations',
            Icon: <FontAwesome6 name="user-doctor" size={36} color="#007e71" />,
            link: '/Comingsoon/doctor',
        },
        {
            name: 'Print',
            sub: 'Service',
            Icon: <Foundation name="print" size={40} color="#007e71" />,
            link: '/Comingsoon/print',
        },
    ];

    return (
        <ScrollView>
            <View style={{ flexDirection: 'row' }}>
                <FlatList
                    data={all}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <BodyStyle
                            name={item.name}
                            sub={item.sub}
                            Icon={item.Icon}
                            link={item.link}
                        />
                    )}
                    numColumns={Math.floor(width / 120)} // Adjust number of columns based on screen width
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
                    scrollEnabled={false}
                />
            </View>
        </ScrollView>
    );
}
