import CheckBox from 'expo-checkbox';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Terms_n_Conditions() {
  const [isSelected, setSelection] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerRow}>
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="#00A99D"
          style={styles.arrowIcon}
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <Text style={styles.date}>Effective Date: 01/05/2025</Text>

      <Text style={styles.heading}>1. User Responsibilities</Text>
      <Text style={styles.paragraph}>
        • Provide accurate and complete prescription and delivery details.{'\n'}
        • Upload valid prescriptions for restricted medicines (Schedule H/H1).{'\n'}
        • Do not misuse the app for illegal or fraudulent activities.{'\n'}
        • Check expiry and packaging upon delivery. Report concerns immediately.
      </Text>

      <Text style={styles.heading}>2. Prescription Policy</Text>
      <Text style={styles.paragraph}>
        • Medicines requiring prescriptions will only be delivered upon valid verification.{'\n'}
        • Prescriptions must be issued by certified medical professionals.{'\n'}
        • We reserve the right to reject any invalid or suspicious prescription.
      </Text>

      <Text style={styles.heading}>3. Refund & Return Policy</Text>
      <Text style={styles.paragraph}>
        • Medicines once delivered cannot be returned unless tampered, expired, or incorrect.{'\n'}
        • Refunds will be processed within 7 working days of approval.{'\n'}
        • Contact customer support within 48 hours of delivery for return issues.
      </Text>

      <Text style={styles.heading}>4. User Conduct</Text>
      <Text style={styles.paragraph}>
        • Abusive behavior toward delivery personnel or staff will not be tolerated.{'\n'}
        • Avoid placing fake orders or repeated cancellations without valid reason.
      </Text>

      <Text style={styles.heading}>5. Data Privacy</Text>
      <Text style={styles.paragraph}>
        • All personal and prescription data is kept confidential and encrypted.{'\n'}
        • We do not sell or misuse your health or identity data under any circumstances.
      </Text>

      <Text style={styles.heading}>6. Service Availability</Text>
      <Text style={styles.paragraph}>
        • Service availability may vary based on PIN code, medicine availability, and delivery partner access.{'\n'}
        • Orders may be delayed due to emergencies, natural calamities, or health regulations.
      </Text>

      <Text style={styles.heading}>7. Termination of Access</Text>
      <Text style={styles.paragraph}>
        • We reserve the right to suspend access in case of misuse, fraud, or legal violations.{'\n'}
        • You may discontinue using the app at any time.
      </Text>

      <Text style={styles.heading}>8. Legal & Disputes</Text>
      <Text style={styles.paragraph}>
        • These terms are governed by Indian law.{'\n'}
        • Disputes will be resolved under the jurisdiction of the user serviceable city.
      </Text>

      <Text style={styles.heading}>9. Updates to Terms</Text>
      <Text style={styles.paragraph}>
        • We may update these terms from time to time. Continued use of the app indicates acceptance.
      </Text>

      <View style={styles.checkboxContainer}>
        <CheckBox value={isSelected} onValueChange={setSelection} style={styles.checkbox} />
        <Text style={styles.label}>
          By continuing to use the app, you agree to these Terms & Conditions.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    backgroundColor: '#f7fdfd',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrowIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A99D',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 20,
  },
  checkbox: {
    marginTop: 4,
  },
  label: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
});
