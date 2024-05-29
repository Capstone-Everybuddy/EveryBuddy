import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  studentIdCheckInputChange: (name: string, studentId: string) => void;
}
const StudentCardCheck = ({ studentIdCheckInputChange }: Props) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/ocr`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const { images } = await response.json();
      if (images[0].inferResult === 'SUCCESS') {
        let studentId = '';
        let name = '';
        images[0].fields.forEach((field: any) => {
          if (field.name === 'name') name = field.inferText;
          if (field.name === 'studentId') studentId = field.inferText;
        });
        studentIdCheckInputChange(name, studentId);
      } else {
        console.log('이미지 인식 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Title>Please Upload your Student Card</Title>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <Image src={URL.createObjectURL(image)} alt="Uploaded" />}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

const Title = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Image = styled.img`
  width: 200px;
  border-radius: 8px;
  margin-top: 10px;
`;

const ExtractedText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

export default StudentCardCheck;
