import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const calculate = (operator: string) => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setResult("Result : Please enter valid numbers");
      return;
    }

    if (operator === "/" && n2 === 0) {
      setResult("Result : Cannot divide by zero");
      return;
    }

    let res: number;
    switch (operator) {
      case "+":
        res = n1 + n2;
        break;
      case "-":
        res = n1 - n2;
        break;
      case "*":
        res = n1 * n2;
        break;
      case "/":
        res = n1 / n2;
        break;
      default:
        return;
    }

    setResult(`Result: ${res}`);
  };

  return (
    <View style={styles.container}>
      <Text>Enter Numbers:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
        placeholder="Enter first number"
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
        placeholder="Enter second number"
      />
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => calculate("+")} />
        <Button title="-" onPress={() => calculate("-")} />
        <Button title="*" onPress={() => calculate("*")} />
        <Button title="/" onPress={() => calculate("/")} />
      </View>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 15,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  result: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default Calculator;
