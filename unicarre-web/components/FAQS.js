import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FAQs = () => {
  const faqs = [
    {
      id: '1',
      question: 'What is Uni Care Medical Help?',
      answer: 'Uni Care Medical Help is a mobile application that provides medical assistance and resources at your fingertips.',
    },
    {
      id: '2',
      question: 'How do I sign up for Uni Care Medical Help?',
      answer: 'You can sign up by providing your full name, registration number, dorm room, email, and password on the registration page.',
    },
    {
      id: '3',
      question: 'How do I add an emergency contact?',
      answer: 'You can add an emergency contact by navigating to the Emergency Contacts section and filling out the contact\'s name and phone number.',
    },
    {
      id: '4',
      question: 'How do I view my medical history?',
      answer: 'You can view your medical history by navigating to the Medical History section, where you can see all your past medical records.',
    },
    {
      id: '5',
      question: 'How do I contact support?',
      answer: 'You can contact support by navigating to the Contact Us section and reaching out through the provided social media links or phone numbers.',
    },
    {
      id: '6',
      question: 'How do I update my profile information?',
      answer: 'You can update your profile information by navigating to the Settings section and making the necessary changes.',
    },
    {
      id: '7',
      question: 'How do I delete my account?',
      answer: 'To delete your account, please contact support through the Contact Us section for assistance.',
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.faqItem}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Frequently Asked Questions</Text>
      <FlatList
        data={faqs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  faqItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 14,
    color: '#888',
  },
});

export default FAQs;
