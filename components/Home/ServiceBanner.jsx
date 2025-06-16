import { COLOR } from '@/constants/color';
import { MaterialIcons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const ServiceBanner = ({ image, title, description, buttonText, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <MaterialIcons name="arrow-forward" size={28} color={COLOR.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f9f9',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    width: '100%',
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#202020',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#00bfa5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ServiceBanner;
