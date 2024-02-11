import { Button, Form, FormInstance } from "antd";
import { useEffect, useState } from "react";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button
      type="primary"
      htmlType="submit"
      className="bg-primary mb-2 mt-5"
      size="large"
      block={true}
      disabled={!submittable}
    >
      Next
    </Button>
  );
};

export default SubmitButton;
