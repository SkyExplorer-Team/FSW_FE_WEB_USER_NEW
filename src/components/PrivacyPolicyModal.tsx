import { Modal } from "antd";

export default function PrivacyPolicyModal({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) {
  return (
    <Modal
      title="Privacy Policy"
      className="text-center font-semibold"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <hr className="w-100 mt-5" />
      <div className="text-left px-8 flex flex-col gap-4 my-8">
        <div className="flex flex-col font-semibold">
          1. Introduction
          <div className="pl-4 font-normal">
            SkyEksplorer Airlines Services Ltd. ("SkyEksplorer," "we," "our," or
            "us") is committed to protecting the privacy of our users. This
            Privacy Policy outlines how we collect, use, disclose, and protect
            your personal information when you use our flight booking services
            via mobile or website.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          2. Services Description
          <div className="pl-8 font-normal">
            <ul className="list-disc">
              <li>
                User Account Information: When you create an account, we collect
                your name, email address, and other relevant information.
              </li>
              <li>
                Booking and Payment Information: To facilitate flight bookings,
                we collect information related to your bookings and payment
                details.
              </li>
              <li>
                Usage Data: We collect data on your interactions with our
                services, including pages visited, searches, and preferences.
              </li>
              <li>
                Device Information: We collect information about the device you
                use to access our services, such as the device type, operating
                system, and browser.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          3. How We Use Your Information
          <div className="pl-4 font-normal">
            We use the collected information for the following purposes:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc">
              <li>To provide and personalize our flight booking services.</li>
              <li>To process transactions and bookings.</li>
              <li>To improve our services and enhance user experience.</li>
              <li>To communicate with you about your bookings and updates.</li>
              <li>To analyze usage patterns and optimize our platform.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          4. Data Sharing and Disclosure
          <div className="pl-4 font-normal">
            We may share your information with:
          </div>
          <div className="pl-8 font-normal">
            <ul className="list-disc">
              <li>Airlines and service providers to fulfill bookings.</li>
              <li>Payment processors for secure transactions.</li>
              <li>Payment processors for secure transactions.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          5. Security Measures
          <div className="pl-4 font-normal">
            We implement reasonable security measures to protect your
            information from unauthorized access or disclosure.
          </div>
        </div>
      </div>
    </Modal>
  );
}
