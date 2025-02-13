import { TouchableOpacity, Text } from "react-native";

type ButtonProps = {
  title: string;
  size: "small" | "medium" | "large";
  color: "primary" | "secondary" | "danger";
  onPress: () => void;
};

export default function CustomButton({ title, size, color, onPress }: ButtonProps) {
  const sizeStyles = {
    small: "py-1 px-3 text-sm",
    medium: "py-2 px-4 text-base",
    large: "py-3 px-6 text-lg",
  };

  const colorStyles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <TouchableOpacity
      className={`rounded-md ${sizeStyles[size]} ${colorStyles[color]} active:opacity-70`}
      onPress={onPress}
    >
      <Text className="text-center">{title}</Text>
    </TouchableOpacity>
  );
}
