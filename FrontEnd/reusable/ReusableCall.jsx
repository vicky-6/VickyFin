// src/components/InterestCalc.jsx
import React, { useState, useEffect } from "react";

const InterestCalc = ({ amount, interest, duration, onCalculate }) => {
  const [monthlyInstallment, setMonthlyInstallment] = useState("");

  useEffect(() => {
    if (amount && interest && duration) {
      const principal = parseFloat(amount) || 0;
      const rate = parseFloat(interest) || 0;
      const months = parseInt(duration) || 0;

      if (principal > 0 && rate > 0 && months > 0) {
        const totalPayable = principal + principal * (rate / 100) * months;
        const installment = (totalPayable / months).toFixed(2);
        setMonthlyInstallment(installment);

        // send back result to parent
        onCalculate(installment);
      } else {
        setMonthlyInstallment("");
        onCalculate("");
      }
    }
  }, [amount, interest, duration, onCalculate]);

  return (
    <div className="mb-3">
      <label className="form-label">Monthly Installment (Auto)</label>
      <input
        type="text"
        className="form-control bg-light"
        value={monthlyInstallment}
        readOnly
      />
    </div>
  );
};

export default InterestCalc;
