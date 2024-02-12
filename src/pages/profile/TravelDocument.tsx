import React, { useState } from "react";
import { Select, Form, Input, Typography, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { FlagIcon, FlagIconCode } from "react-flag-kit";

interface ContactFormData {
  email: string;
  phoneNumber: string;
}

const { Option } = Select;

const TravelDocument: React.FC = () => {
    

  const nationalityOptions = [
    { flag: "🇺🇸", name: "United States", value: "US" },
    { flag: "🇬🇧", name: "United Kingdom", value: "GB" },
    { flag: "🇨🇦", name: "Canada", value: "CA" },
    { flag: "🇦🇺", name: "Australia", value: "AU" },
    { flag: "🇩🇪", name: "Germany", value: "DE" },
    { flag: "🇫🇷", name: "France", value: "FR" },
    { flag: "🇯🇵", name: "Japan", value: "JP" },
    { flag: "🇮🇳", name: "India", value: "IN" },
    { flag: "🇧🇷", name: "Brazil", value: "BR" },
    { flag: "🇮🇩", name: "Indonesia", value: "ID" },
    // Add more nationality options as needed
  ];
  const [contactData, setContactData] = useState<ContactFormData>({
    email: "",
    phoneNumber: "",
  });
  const handleContactFormChange =
    (fieldName: keyof ContactFormData) => (value: string) => {
      setContactData({
        ...contactData,
        [fieldName]: value,
      });
    };

  const [selectedNationality, setSelectedNationality] = useState<string>("");

  const handleChangeNationality = (value: string) => {
    setSelectedNationality(value);
    // You may want to update your form values or state here
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const [form] = Form.useForm();

  return (
    <>
      <h2 className="title-personal_info">Passport Details</h2>
      <Form form={form}>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0, marginTop: 10 }}
            level={5}
          >
            Passport Number
          </Typography.Title>
          <Input
            type="number"
            placeholder="Enter your passport number"
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Issue Date
          </Typography.Title>
          <DatePicker
            onChange={onChange}
            placeholder="Enter date of issue"
            style={{ width: "100%", height: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Expiry Date
          </Typography.Title>
          <DatePicker
            onChange={onChange}
            placeholder="Enter date of expiry"
            style={{ width: "100%", height: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Issuing Country
          </Typography.Title>
          <Select
            showSearch
            optionFilterProp="children"
            onChange={handleChangeNationality}
            value={selectedNationality}
            className="font-normal"
            placeholder="Select your nationality"
            style={{ height: "40px" }}            
          >
            {nationalityOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                <div style={{ display: "flex", fontWeight: "bold" }}>
                  <FlagIcon
                    code={option.value as FlagIconCode}
                    size={32}
                    className="mr-4 rounded"
                  ></FlagIcon>
                  {option.name}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>                

        <h2 className="title-personal_info" style={{ marginBottom: "20px" }}>National Identity</h2>        
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0, marginTop: 10 }}
            level={5}
          >
            National ID Number
          </Typography.Title>
          <Input
            type="number"
            placeholder="Enter your National Identity Number"
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Issuing Country
          </Typography.Title>
          <Select
            showSearch
            optionFilterProp="children"
            onChange={handleChangeNationality}
            value={selectedNationality}
            className="font-normal"
            placeholder="Select your nationality"
            style={{ height: "40px" }}            
          >
            {nationalityOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                <div style={{ display: "flex", fontWeight: "bold" }}>
                  <FlagIcon
                    code={option.value as FlagIconCode}
                    size={32}
                    className="mr-4 rounded"
                  ></FlagIcon>
                  {option.name}
                </div>
              </Option>
            ))}
          </Select>
        </Form.Item>   
        <h2 className="title-personal_info">Emergency Contact</h2>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            First and Middle Name
          </Typography.Title>
          <Input
            placeholder="Your First & Middle Name"            
            style={{ height: "40px" }}
          />
          <label style={{ color: "var(--Neutral-400, #99A2B2)", fontSize: "14px", fontWeight: "400" }}>            
            Middle name is optional
          </label>          
        </Form.Item>
        <Form.Item>
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Last Name
          </Typography.Title>
          <Input
            placeholder="Your Last Name"            
            style={{ height: "40px" }}
          />          
        </Form.Item>
        <Form.Item                    
        >
          <Typography.Title
            style={{ paddingBottom: 0, marginBottom: 0 }}
            level={5}
          >
            Phone Number
          </Typography.Title>
          <Form.Item
            name="locale"
            rules={[{ required: false }]}
            style={{
              display: "inline-block",
              width: "18%",
              marginRight: "2%",
            }}
          >
            <Input
              defaultValue="+62"
              readOnly={true}
              size="large"
              suffix={<FlagIcon code={"ID"} size={28} className="rounded" />}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            rules={[
              { required: true },
              {
                pattern: /^[0-9]*$/,
                message: "Please enter a valid phone number",
              },
              {
                min: 6,
                message:
                  "Invalid phone number length. Please enter a valid phone number with at least 8 digits",
              },
            ]}
            style={{
              display: "inline-block",
              width: "80%",
            }}            
          >
            <Input
              size="large"
              placeholder="Phone Number"
              onChange={(e) =>
                handleContactFormChange("phoneNumber")("+62" + e.target.value)
              }
            />
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  );
};

export default TravelDocument;
