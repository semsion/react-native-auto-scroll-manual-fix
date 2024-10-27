import React, { useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const ReactNativeAutoScrollManualFix: React.FC = () => {
  // State to manage the input fields
  const [inputs, setInputs] = React.useState([
    { type: 'predefined', value: 'What would you like to write about?' },
    { type: 'user', value: '' }
  ]);
  const textInputRefs = useRef<(TextInput | null)[] >([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const loremIpsumTexts: string[] = [
    "Feedback text. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Feedback text. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Feedback text. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Feedback text. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ];

  
  const handleChangeText = (index: number, text: string) => {
    const newInputs = [...inputs];
    newInputs[index].value = text;
    setInputs(newInputs);
  };

  const handleAddText = () => {
    const randomText = loremIpsumTexts[Math.floor(Math.random() * loremIpsumTexts.length)];

    setInputs(prevInputs => [
      ...prevInputs,
      { type: 'predefined', value: randomText },
      { type: 'user', value: '' }
    ]);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    } else {
      console.warn('scrollViewRef.current is null');
    }
  };

  // Effect to focus the last input field when a new one is added
  useEffect(() => {
    if (inputs.length > 0) {
      const lastInputIndex = inputs.length - 1;
      if (inputs[lastInputIndex].type === 'user') {
        textInputRefs.current[lastInputIndex]?.focus();
      }
    }
  }, [inputs]);


  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} 
    >
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} ref={scrollViewRef}>
          <View style={styles.inner}>
            {inputs.map((input, index) => (
              <TextInput
                key={index}
                ref={el => (textInputRefs.current[index] = el)}
                style={input.type === 'user' ? styles.textAreaUser : styles.textAreaPredefined}
                multiline
                value={input.value}
                editable={input.type === 'user'}
                placeholder={input.type === 'user' ? 'Enter text' : ''}
                onChangeText={text => handleChangeText(index, text)}
                onFocus={() => {
                  scrollViewRef.current?.scrollToEnd({ animated: true });
                }}
              />
          ))}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddText()}>
            <Text style={styles.buttonText}>Feedback (Lorem ipsum)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    // flex: 1,
    flexGrow: 1,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textAreaUser: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    flex: 1
  },
  textAreaPredefined : {
    fontSize: 18,
    color: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  buttonContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    width: '70%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReactNativeAutoScrollManualFix;