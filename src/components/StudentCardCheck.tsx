import React, { FormEvent, MouseEventHandler, useState } from 'react';
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
      const response = await fetch(`/api/ocr`, {
        method: 'POST',
        body: formData,
      });
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
      <OcrTitle>
        <Title>Please Upload your Student Card</Title>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </OcrTitle>
      <Input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <Image src={URL.createObjectURL(image)} alt="Uploaded" />}
    </div>
  );
};

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const Image = styled.img`
  width: 200px;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 10px;
  display: block;
`;

const OcrTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; /* 간격을 주기 위해 마진 추가 */
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0; /* 기본 마진 제거 */
`;

const SubmitButton = styled.button`
  padding: 8px 10px;
  background-color: ${(props) => props.theme.colors.orange};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
`;
export default StudentCardCheck;
