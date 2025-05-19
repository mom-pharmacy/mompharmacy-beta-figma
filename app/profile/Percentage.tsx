// components/ProfileCompletionCard.tsx

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface Props 
{
  percentage: number;
}

const ProfileCompletionCard: React.FC<Props> = ({ percentage }) => 
  {
    console.log("this is from percent:", percentage)
  const radius = 24;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  console.log(percentage)

  const getColor = (percent: number) => {
    if (percent < 50) return '#FF6347'; 
    if (percent < 80) return '#FFA500'; 
    return '#1A7563'; 
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressSection}>
        <View style={styles.svgContainer}>
          <Svg width={60} height={60}>
            <Circle
              stroke="#E0E0E0"
              fill="none"
              cx="30"
              cy="30"
              r={radius}
              strokeWidth={strokeWidth}
            />
            <Circle
              stroke={getColor(percentage)}
              fill="none"
              cx="30"
              cy="30"
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={[circumference, circumference]}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              rotation="-90"
              origin="30, 30"
            />
          </Svg>
          <Text style={styles.percentageInside}>{`${percentage}%`}</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.percentageText}>{`${percentage}% Profile completed`}</Text>
          <Text style={styles.subText}>Complete and earn 100 HC</Text>
        </View>
      </View>
  <TouchableOpacity onPress={()=>router.push('/profile/edit')}>
     <View style={styles.completeButton}>
       
        <Text style={styles.completeText}>Complete</Text>
        <Ionicons name="arrow-forward" size={18} color="#1A7563" />
      </View>
  </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E7F5F3',
    marginBottom: 16,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  svgContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  percentageInside: {
    position: 'absolute',
    fontWeight: '700',
    fontSize: 14,
    color: '#1A1A1A',
  },
  textContainer: {
    marginLeft: 12,
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
