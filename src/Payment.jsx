// แก้ handlePaid แค่นี้
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

    await fetch("/api/paid", {
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
