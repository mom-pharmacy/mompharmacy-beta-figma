import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to mom pharmacy</Text>

      <Link href="/profile/profile" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} >Go to Profile Page</Text>
        </Pressable>
      </Link>
      <TouchableHighlight onPress={()=>{router.replace("./profile/address")}}>
      <Text>profile</Text>
    </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});