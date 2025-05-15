import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileCompletionCard: React.FC = () => {
  const navigation = useNavigation();

//   const handleCompletePress = () => {
//     navigation.navigate('ProfileCompletion');
//   };

  return (
    // <Pressable onPress={handleCompletePress}>
    <>
    <View  style={styles.container}>
    <View style={styles.progressSection}>
        <Ionicons name="chevron-back-outline" size={32} color="#1A7563" />
        <View style={styles.textContainer}>
          <Text style={styles.percentageText}>80% Profile completed</Text>
          <Text style={styles.subText}>Complete and earn 100 HC</Text>
        </View>
      </View>
      <View style={styles.completeButton}>
        <Text style={styles.completeText}>Complete</Text>
        <Ionicons name="arrow-forward" size={18} color="#1A7563" />
      </View>

    </View>
    
    </>
      
    
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  percentageText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1A1A1A',
  },
  subText: {
    fontSize: 12,
    color: '#5C5C5C',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#1A7563',
    marginRight: 4,
  },
});

export default ProfileCompletionCard;