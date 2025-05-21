import { userAuth } from '@/Context/authContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SuggestAndEarn from '../profile/sug_box'
import SuggestTop from '../profile/SugboxTop'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const SuggestProductsScreen: React.FC = () => {
  const [productSuggestion, setProductSuggestion] = useState('');
  const [technicalSuggestion, setTechnicalSuggestion] = useState('');
  const [nonTechnicalSuggestion, setNonTechnicalSuggestion] = useState('');

  const [showTechnical, setShowTechnical] = useState(false);
  const [showNonTechnical, setShowNonTechnical] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const {userDetails, ExtractParseToken} = userAuth()

  const toggleSection = (type: 'tech' | 'nonTech') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (type === 'tech') setShowTechnical(!showTechnical);
    else setShowNonTechnical(!showNonTechnical);
  };


  const handleSubmit = async (type: string) => {
    let suggestionText = '';
    let suggestionType = '';
    let isTechnical = false;
    let isNonTechincal = false;

    switch (type) {
      case 'product':
        suggestionText = productSuggestion;
        suggestionType = 'Product';
        break;
      case 'technical':
        suggestionText = technicalSuggestion;
        suggestionType = 'Feature';
        isTechnical = true;
        break;
      case 'non-technical':
        suggestionText = nonTechnicalSuggestion;
        suggestionType = 'Bug';
        isNonTechincal = true;
        break;
      default:
        return;
    }

    try {
      const response = await fetch('https://mom-beta-server1.onrender.com/api/suggestions/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userDetails._id,
          suggestion: suggestionText,
          suggestionType,
          isTechnical,
          isNonTechincal,
        }),
      });
      
      console.log("this is from suggestions" , response)

      const data = await response.json();

      if (response.ok) {
        setShowSuccessModal(true); 

        setTimeout(() => {
          setShowSuccessModal(false);
        }, 2000); 

        if (type === 'product') setProductSuggestion('');
        else if (type === 'technical') setTechnicalSuggestion('');
        else if (type === 'non-technical') setNonTechnicalSuggestion('');
      } else {
        alert(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('An error occurred while submitting your suggestion.');
    }
  };

  return (
    <SafeAreaView>
       <View style={styles.container2}>
        <View>
          
          <View style={styles.card}>
             <MaterialIcons
            name="arrow-back"
            size={24}
            color="#00A99D"
            style={styles.arrowIcon}
            onPress={() => router.back()}
          />
              
              {/* Dummy Image */}
              <Image
                source={require('../../assets/images/sug2.png')}
                style={styles.image}
              />
              {/* Texts */}
              <View style={styles.textContainer}>
                <Text style={styles.title2}>Earn ₹1000</Text>
                <Text style={styles.subtitle2}>Suggest & Earn</Text>
                <Text style={styles.caption}>Spot it. Suggest it. Earn for it</Text>
              </View>
            </View>

        </View>
            
        </View>
      
    <ScrollView contentContainerStyle={styles.container}>
      <View>

     
      {/* <View style={styles.sugimg}>
        <View style={styles.headerRow}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#00A99D"
            style={styles.arrowIcon}
            onPress={() => router.back()}
          />
          <Text style={styles.header}>Suggestion</Text>
        </View>
      </View> */}
      
      {/* <SuggestTop></SuggestTop> */}
      

      <Text style={styles.subtitle}>
        Didn't find what you are looking for? Please suggest the product
      </Text>

      <TextInput
        style={styles.textArea}
        placeholder="Enter the name of the products you would like to see on mom pharmacy"
        placeholderTextColor="#A0A0A0"
        multiline
        value={productSuggestion}
        onChangeText={setProductSuggestion}
      />
      <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('product')}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dropdownHeader} onPress={() => toggleSection('tech')}>
        <Text style={styles.dropdownTitle}>Technical Suggestion</Text>
        <Ionicons name={showTechnical ? 'chevron-up' : 'chevron-down'} size={20} />
      </TouchableOpacity>
      {showTechnical && (
        <>
          <TextInput
            style={styles.textArea}
            placeholder="Enter your technical suggestion"
            placeholderTextColor="#A0A0A0"
            multiline
            value={technicalSuggestion}
            onChangeText={setTechnicalSuggestion}
          />
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('technical')}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.dropdownHeader} onPress={() => toggleSection('nonTech')}>
        <Text style={styles.dropdownTitle}>Non-Technical Suggestion</Text>
        <Ionicons name={showNonTechnical ? 'chevron-up' : 'chevron-down'} size={20} />
      </TouchableOpacity>
      {showNonTechnical && (
        <>  
          <TextInput
            style={styles.textArea}
            placeholder="Enter your non-technical suggestion"
            placeholderTextColor="#A0A0A0"
            multiline
            value={nonTechnicalSuggestion}
            onChangeText={setNonTechnicalSuggestion}
          />
          <TouchableOpacity style={styles.submitButton} onPress={() => handleSubmit('non-technical')}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </>
      )}

      {/* ✅ Success Modal */}
      <Modal transparent visible={showSuccessModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>✅ Suggestion submitted successfully!</Text>
          </View>
        </View>
      </Modal>
       </View>
             <SuggestAndEarn></SuggestAndEarn>

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container2: 
  {
    
    
    width:'auto',
  },
   card: {
    
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A9D8F", // greenish color like in the image
    borderBottomLeftRadius: 16,
    borderBottomRightRadius:16,
    padding: 30,
    marginBottom:1,
  },
  image: {
    width: 80,
    //height: 80,
    maxHeight:90,
    resizeMode: "contain",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title2: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 4,
  },
  caption: {
    color: "#e0f7f4",
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    padding: 16,
    paddingBottom: 180,
    backgroundColor: '#fff',
  },
  
  sugimg: {
    flexDirection: 'row',
  },
  suggest: {
    width: 60,
    height: 50,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 10,
    color: '#1A7563',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
    marginLeft: 80  ,
  },
  arrowIcon: {
    marginLeft: -10,
    color:'white',
    marginBottom:60
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  textArea: {
    backgroundColor: '#D6F0EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 10,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#007B65',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownHeader: {
    backgroundColor: '#D6F0EB',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#007B65',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SuggestProductsScreen;