import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

type CalculatorProps = {
  num1: number; // ตัวเลขตัวที่ 1
  num2: number; // ตัวเลขตัวที่ 2
  operation: string; // เครื่องหมายการคำนวณ
};

const Calculator: React.FC<CalculatorProps> = ({ num1, num2, operation }) => {
  const calculateResult = () => {
    switch (operation) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case '*':
        return num1 * num2;
      case '/':
        return num2 !== 0 ? num1 / num2 : 'Error (Division by 0)';
      default:
        return 'Invalid Operation';
    }
  };

  const result = calculateResult();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {`${num1} ${operation} ${num2} = ${result}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default Calculator;
