import { Stack } from "expo-router";
import Navbar from "./components/Navbar"; // ✅ Import Navbar ที่แก้ไขแล้ว

export default function Index() {
  return (
    <>
      <Navbar /> {/* ✅ เรียก Navbar มาตรงๆ ไม่ต้องใช้ Stack */}
    </>
  );
}
