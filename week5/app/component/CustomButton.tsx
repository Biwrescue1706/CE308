import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  title: string;
  size: "small" | "medium" | "large";
  color: "primary" | "secondary" | "danger";
  onPress: () => void;
};

export default function CustomButton({ title, size, color, onPress }: ButtonProps) {
  const sizeStyles = {
    small: { paddingVertical: 6, paddingHorizontal: 12, fontSize: 14 , minWidth: 80},
    medium: { paddingVertical: 8, paddingHorizontal: 16, fontSize: 16 , minWidth: 80 },
    large: { paddingVertical: 10, paddingHorizontal: 20, fontSize: 18 , minWidth: 80 }
  };

  const colorStyles = {
    primary: { backgroundColor: "#3B82F6" }, // สีฟ้า
    secondary: { backgroundColor: "#6B7280" }, // สีเทา
    danger: { backgroundColor: "#EF4444" } // สีแดง
  };

  return (
    <TouchableOpacity
      style={[styles.button, sizeStyles[size], colorStyles[color]]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.9,
    minWidth: 50,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});
