
import { COLOR } from '@/constants/color';
import { userAuth } from '@/Context/authContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileCompletionCard from '../profile/Percentage';

const profileSections = [
  {
    title: 'My Orders',
    icon: <Image source={require('@/assets/images/order.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/myorders',
  },
  {
    title: 'My Prescriptions',
    icon: <Image source={require('@/assets/images/prescription.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/prescription',
  },
  {
    title: 'Wish List',
    icon: <Image source={require('../../assets/images/wishlist.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/wishlist',
  },
  {
    title: 'Tell Us What You Need',
    icon: <Image source={require('@/assets/images/suggestion.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/suggestionbox',
  },
  {
    title: 'My Reports',
    icon: <Image source={require('@/assets/images/report.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/my_reports',
  },
  {
    title: 'Address Book',
    icon: <Image source={require('@/assets/images/address.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/addressbook',
  },
  {
    title: 'Terms & Conditions',
    icon: <Image source={require('@/assets/images/terms.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/terms&conditions',
  },
  {
    title: 'Settings',
    icon: <Image source={require('@/assets/images/settings.png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/settings',
  },
  {
    title: 'About Us',
    icon: <Image source={require('@/assets/images/about .png')} style={{ height: 20, width: 20 }} />,
    link: '../profile/About',
  },
];

export default function ProfileScreen() {
  const [user, setUser] = useState({ name: '', email: '', mobileNo: '' });
  const {ExtractParseToken} = userAuth()
  const fetchUserDetails = async () => {
    try {
      const tokenAuth = await ExtractParseToken() ;

      const response = await fetch('https://mom-beta-server.onrender.com/api/user/user-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenAuth}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.userDetails); // assuming API returns { userDetails: { name, email, ... } }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logged Out', 'You have been logged out successfully.');
  };

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="chevron-back-outline" size={32} color="#1A7563" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account & Settings</Text>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.editContainer}>
          <Pressable onPress={() => router.push('/profile/edit')}>
            <Image source={require('@/assets/images/edit.png')} style={{ height: 20, width: 20 }} />
          </Pressable>
        </View>

        <View style={styles.profileContainer}>
          <Image style={styles.avatar} source={require('../../assets/images/profileimg.png')} />
          <View style={styles.profileDetails}>
            <Text style={styles.name}>{user.name || 'Loading...'}</Text>
            <Text style={styles.email}>{user.email || ''}</Text>
          </View>
        </View>

        <ProfileCompletionCard />
      </View>

      <FlatList
        data={profileSections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(item.link)} style={styles.profileBox}>
            <View style={styles.row}>
              {item.icon}
              <Text style={styles.sectionTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        scrollEnabled={false}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <View style={styles.footerTextContainer}>
        <Text style={styles.footerText}>Care Like Your Mom</Text>
        <Text style={styles.footerText}>Made with Love by mom Fam</Text>
      </View>

      <View style={styles.bottomLogosContainer}>
        <View style={styles.logoBlock}>
          <Image source={require('../../assets/images/momlogo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.logoText}>mom pharmacy</Text>
        </View>
        <View style={styles.logoBlock}>
          <Image source={require('../../assets/images/momlabs.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.logoText}>mom labs</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  box: {
    backgroundColor: '#42beb5',
    paddingBottom: 16,
  },
  header: {
    backgroundColor: COLOR.light,
    paddingVertical: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007e71',
    marginLeft: 12,
  },
  editContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  avatar: {
    width: 150,
    height: 100,
    borderRadius: 40,
  },
  profileDetails: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
  profileBox: {
    backgroundColor: '#d1edec',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007e71',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#B5000A',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  footerTextContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007e71',
    marginVertical: 4,
  },
  bottomLogosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 30,
  },
  logoBlock: {
    alignItems: 'center',
    width: 150,
  },
  logoImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
