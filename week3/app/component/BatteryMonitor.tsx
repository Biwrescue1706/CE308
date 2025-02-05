import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Battery from "expo-battery";

const BatteryMonitor: React.FC = () => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const fetchBatteryLevel = async () => {
      const level = await Battery.getBatteryLevelAsync();
      setBatteryLevel(level * 100); // แปลงเป็นเปอร์เซ็นต์
    };

    fetchBatteryLevel();
  }, []);

  return (
    <View style={styles.container}>
      {batteryLevel !== null ? (
        <>
          <Text style={styles.text}>🔋 พลังงานแบตเตอรี่: {batteryLevel.toFixed(0)}%</Text>
          {batteryLevel < 20 && <Text style={styles.warning}>⚠️ แบตเตอรี่ต่ำ! กรุณาชาร์จ</Text>}
        </>
      ) : (
        <Text style={styles.text}>กำลังโหลดข้อมูลแบตเตอรี่...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  warning: {
    fontSize: 18,
    color: "red",
    marginTop: 10,
  },
});

export default BatteryMonitor;
