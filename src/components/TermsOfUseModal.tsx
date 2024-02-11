import { Modal } from "antd";

export default function TermsOfUseModal({
  open,
  onCancel,
}: {
  open: boolean;
  onCancel: () => void;
}) {
  return (
    <Modal
      title="Terms Of Use"
      className="text-center font-semibold"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <hr className="w-100 mt-5" />
      <div className="text-left px-8 flex flex-col gap-4 my-8">
        <div className="flex flex-col font-semibold">
          1. Acceptance of Terms
          <div className="pl-4 font-normal">
            By accessing or using SkyEksplorer via mobile or website, you agree
            to comply with and be bound by these Terms of Use. If you do not
            agree with any part of these terms, please do not use our services.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          2. Services Description
          <div className="pl-4 font-normal">
            Our flight booking services allow users to search, compare, and book
            flights. We provide information about flights, airlines, and prices.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          3. User Accounts
          <div className="pl-4 font-normal">
            To access certain features of our services, you may need to create a
            user account. You are responsible for maintaining the
            confidentiality of your account information and are fully
            responsible for all activities that occur under your account.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          4. Booking and Payments
          <div className="pl-4 font-normal">
            When you make a flight booking, you agree to abide by the terms and
            conditions of the airline and other service providers. Payment
            processing is conducted through secure third-party payment gateways.
            We are not responsible for any issues related to payment processing.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          5. User Conduct
          <div className="pl-4 font-normal">
            You agree not to use our services for any unlawful or prohibited
            purpose. You may not disrupt or interfere with the security or
            accessibility of our services.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          6. Intellectual Property
          <div className="pl-4 font-normal">
            All content, trademarks, logos, and intellectual property on our
            services are the property of our company or its licensors. You may
            not use, reproduce, or distribute any content without our prior
            written permission.
          </div>
        </div>
        <div className="flex flex-col font-semibold">
          7. Privacy
          <div className="pl-4 font-normal">
            Our Privacy Policy explains how we collect, use, and protect your
            personal information. By using our services, you agree to our
            Privacy Policy.
          </div>
        </div>
      </div>
    </Modal>
  );
}
