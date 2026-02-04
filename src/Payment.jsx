import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import { useState } from "react";

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzmGR44z676R6brKDa5pwnP7mpgDWsWdznADerz0aiu3nuUqimKwyG97wkKWNY4qhFYxA/exec";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!state) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>ไม่พบข้อมูลออเดอร์</Typography>
      </Container>
    );
  }

  const {
    orderId,
    customerName,
    customerNote,
    orderType,
    items,
    total,
  } = state;

  const handlePaid = async () => {
    try {
      setLoading(true);

      const payload = {
        type: "PAID",
        orderId,
        customerName,
        customerNote,
        orderType,
        items,
        total,
      };

      await fetch(GAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert("รับชำระเงินแล้ว ✅");
      navigate("/");
    } catch (err) {
      alert("ส่งข้อมูลไม่สำเร็จ ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5">💳 ชำระเงิน</Typography>
      <Typography>ออเดอร์: {orderId}</Typography>
      <Typography>ลูกค้า: {customerName}</Typography>
      <Typography sx={{ mb: 2 }}>รวม: {total} บาท</Typography>

      {/* QR CODE */}
      <Box sx={{ textAlign: "center", my: 3 }}>
        <img
          src="/qr.jpg"
          alt="QR รับเงิน"
          style={{ width: "100%", maxWidth: 280 }}
        />
        <Typography sx={{ mt: 1 }}>
          สแกนเพื่อชำระเงิน
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="success"
        onClick={handlePaid}
        disabled={loading}
      >
        {loading ? "กำลังส่ง..." : "ยืนยันว่าชำระเงินแล้ว"}
      </Button>
    </Container>
  );
}
