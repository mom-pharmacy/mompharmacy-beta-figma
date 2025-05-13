// app/profile/ProfileItem.jsx
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function ProfileItem({ title, icon, link }) {
  return (
    <Link href={link} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: '#d0ece9' }}
      >
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={styles.iconWrapper}>
              {icon}
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#E6F5F2',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  pressed: {
    backgroundColor: '#d0ece9',
  },
  row: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#D1EDE8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    marginLeft: 12,
    color: '#04736F',
    fontWeight: '500',
  },
});

export default ProfileItem;
