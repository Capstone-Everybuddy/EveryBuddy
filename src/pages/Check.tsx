import React, { useState } from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Main from 'components/Main';
import { useNavigate } from 'react-router-dom';

const Check = () => {
  const [image, setImage] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64Image = result.split(',')[1];
          await performOCR(base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const performOCR = async (base64Image: string) => {
    try {
      const response = await fetch(
        'https://npzkkvvfw2.apigw.ntruss.com/custom/v1/31293/271189c4820c85b4b1724a25d9b557fab9c28f6d18a649b62258ad3608cd5c0d/infer',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-OCR-SECRET': 'QmN1eWh6ZFlMdE10QVFHcVljZHhLQW5TSFV2VHVEZGU=',
          },
          body: JSON.stringify({
            version: 'V1',
            requestId: 'test',
            timestamp: Date.now(),
            images: [
              {
                format: 'jpg',
                name: 'test_image',
                data: base64Image,
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const extractedText = result.images[0].fields
        .map((field: { inferText: string }) => field.inferText)
        .join(' ');
      setExtractedText(extractedText);
    } catch (error) {
      console.error('Error performing OCR:', error);
    }
  };

  const handleNextClick = () => {
    navigate('/register');
  };

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Student Check" />
        <p>Please Upload your Student Card</p>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && (
          <img src={URL.createObjectURL(image)} alt="Uploaded" width="200" />
        )}
        {extractedText && <p>Extracted Text: {extractedText}</p>}
        <NextButton onClick={handleNextClick}>NEXT</NextButton>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 40px;
  cursor: pointer;
  width: 100%;
`;

export default Check;
