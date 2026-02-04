import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Box,
} from "@mui/material";
import { Routes, Route, useNavigate } from "react-router-dom";
import Payment from "./Payment";
import { menus, extras } from "./data/menu";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzmGR44z676R6brKDa5pwnP7mpgDWsWdznADerz0aiu3nuUqimKwyG97wkKWNY4qhFYxA/exec";

export default function App() {
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("ทานที่ร้าน");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    setOrderId("ORD-" + Date.now());
  }, []);

  const addItem = (item) => {
    setCart((prev) => [
      ...prev,
      {
        uid: Date.now() + Math.random(),
        id: item.id,
        name: item.name,
        price: item.price,
        hasSpicy: !!item.spicy,
        hasBitter: !!item.bitter,
        hasCook: !!item.hasCook,
        spicy: item.spicy ? "เผ็ดกลาง" : "",
        bitter: item.bitter ? "ไม่ขม" : "",
        cook: item.hasCook ? "สุก" : "",
      },
    ]);
  };

  const updateItem = (uid, field, value) => {
    setCart((prev) =>
      prev.map((i) => (i.uid === uid ? { ...i, [field]: value } : i))
    );
  };

  const removeItem = (uid) => {
    setCart((prev) => prev.filter((i) => i.uid !== uid));
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  // ================= ส่ง ORDER ไป LINE =================
  const submitOrder = () => {
  const payload = {
    type: "ORDER",
    orderId,
    customerName,
    customerNote,
    orderType,
    total,
    items: cart,
  };

  console.log("📤 ส่ง ORDER ไป GAS:", payload);

  // 🔴 ส่งแบบ no-cors ห้าม await / ห้ามเช็ค response
  fetch(GAS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // ✅ ถือว่าสำเร็จทันที
  localStorage.setItem("LAST_ORDER", JSON.stringify(payload));
  navigate("/payment", { state: payload });
  setCart([]);
};


  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container maxWidth="sm" sx={{ mt: 4, mb: 6 }}>
            <Typography variant="h4">🍽️ สั่งอาหาร</Typography>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">👤 ชื่อลูกค้า</Typography>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="กรุณาใส่ชื่อ"
                  style={{ width: "100%", padding: 10, marginTop: 8 }}
                />
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">📝 หมายเหตุถึงร้าน</Typography>
                <textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="เช่น ไม่ใส่ผัก, ขอเผ็ดมาก"
                  style={{ width: "100%", minHeight: 80, padding: 10 }}
                />
              </CardContent>
            </Card>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography>📌 ประเภทการสั่ง</Typography>
                <RadioGroup
                  row
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                >
                  <FormControlLabel value="ทานที่ร้าน" control={<Radio />} label="ทานที่ร้าน" />
                  <FormControlLabel value="กลับบ้าน" control={<Radio />} label="กลับบ้าน" />
                </RadioGroup>
                <Typography color="text.secondary">
                  ออเดอร์: {orderId}
                </Typography>
              </CardContent>
            </Card>

            {/* ===== เมนูหลัก ===== */}
            {menus.map((g) => (
              <Card key={g.category} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{g.category}</Typography>
                  {g.items.map((i) => (
                    <Box key={i.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>{i.name} — {i.price} บาท</Typography>
                      <Button onClick={() => addItem(i)}>เพิ่ม</Button>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            ))}

            {/* ===== วัตถุดิบ / อื่น ๆ (ไม่หายแน่นอน) ===== */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">➕ เพิ่มวัตถุดิบ / อื่น ๆ</Typography>
                {extras.map((i) => (
                  <Box key={i.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>{i.name} — {i.price} บาท</Typography>
                    <Button onClick={() => addItem(i)}>เพิ่ม</Button>
                  </Box>
                ))}
              </CardContent>
            </Card>

            {/* ===== ตะกร้า ===== */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">🛒 ตะกร้า</Typography>
                {cart.map((item) => (
                  <Box key={item.uid} sx={{ mb: 2 }}>
                    <Typography>{item.name} — {item.price} บาท</Typography>

                    {item.hasSpicy && (
                      <RadioGroup
                        row
                        value={item.spicy}
                        onChange={(e) => updateItem(item.uid, "spicy", e.target.value)}
                      >
                        {["เผ็ดน้อย", "เผ็ดกลาง", "เผ็ดมาก"].map((l) => (
                          <FormControlLabel key={l} value={l} control={<Radio />} label={l} />
                        ))}
                      </RadioGroup>
                    )}

                    {item.hasCook && (
                      <RadioGroup
                        row
                        value={item.cook}
                        onChange={(e) => updateItem(item.uid, "cook", e.target.value)}
                      >
                        {["ดิบ", "สุก"].map((l) => (
                          <FormControlLabel key={l} value={l} control={<Radio />} label={l} />
                        ))}
                      </RadioGroup>
                    )}

                    {item.hasBitter && (
                      <RadioGroup
                        row
                        value={item.bitter}
                        onChange={(e) => updateItem(item.uid, "bitter", e.target.value)}
                      >
                        {["ไม่ขม", "ขม"].map((l) => (
                          <FormControlLabel key={l} value={l} control={<Radio />} label={l} />
                        ))}
                      </RadioGroup>
                    )}

                    <Button color="error" size="small" onClick={() => removeItem(item.uid)}>
                      ลบ
                    </Button>
                    <Divider sx={{ my: 1 }} />
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Typography variant="h5">รวม: {total} บาท</Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              disabled={!customerName.trim() || cart.length === 0}
              onClick={submitOrder}
            >
              ยืนยันออเดอร์
            </Button>
          </Container>
        }
      />

      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}
