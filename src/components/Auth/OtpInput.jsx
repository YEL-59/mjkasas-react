import React, { useRef } from 'react';

const OtpInput = ({ length = 6, onChange }) => {
  const inputsRef = useRef([]);

  // Handle typing
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return; // only digits

    const otp = [];
    inputsRef.current.forEach((input) => otp.push(input.value));
    onChange(otp.join(''));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pasteData)) return;

    const chars = pasteData.split('').slice(0, length);

    chars.forEach((char, i) => {
      inputsRef.current[i].value = char;
    });

    const otp = inputsRef.current.map((input) => input.value).join('');
    onChange(otp);

    const nextIndex = Math.min(chars.length, length - 1);
    inputsRef.current[nextIndex].focus();
  };

  return (
    <div className="flex justify-center gap-3" onPaste={handlePaste}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          ref={(el) => (inputsRef.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-10 md:w-12 md:h-12 text-center text-lg font-semibold border rounded-[8px] border-[#D9D9D9] focus:ring-2 focus:ring-orange-400 outline-none"
        />
      ))}
    </div>
  );
};

export default OtpInput;
