import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Circle from "/public/assets/circle-border.svg";
import AirplaneVerticalRotated from "/public/assets/airplane-rotated-vertical.svg";

interface StatusFlightDetailProps {
  open: boolean;
  onCancel: () => void;
  status: "Departed" | "Arrived";
}

export default function StatusFlightDetail({
  open,
  onCancel,
  status,
}: StatusFlightDetailProps) {
  const title = (
    <div className="flex items-center">
      <CloseOutlined
        style={{ fontSize: "18px", cursor: "pointer" }}
        onClick={onCancel}
      />
      <div className="flex-grow text-lg font-semibold font-['Plus Jakarta Sans'] leading-7 text-center">
        {status === "Departed" ? "Departure Detail" : "Arrival Detail"}
      </div>
    </div>
  );

  return (
    <Modal
      title={title}
      className="text-center"
      closable={false}
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <hr className="w-100 mt-5" />
      <div className="text-left px-8 flex flex-col gap-4 my-8">
        <div
          className={`flex gap-2 p-2 rounded-xl items-center justify-center text-lg font-normal font-['Plus Jakarta Sans'] leading-7 ${
            status === "Arrived"
              ? "bg-success-background text-success-dark"
              : "bg-warning-lightest text-warning-dark"
          } text-lg font-semibold font-['Plus Jakarta Sans'] leading-7`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className={`h-8 w-8 ${
              status === "Arrived" ? "text-success-dark" : "text-warning-dark"
            }`}
          >
            <path
              d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
              fill={status === "Arrived" ? "#247535" : "#AC5200"}
            />
          </svg>
          {status}
        </div>

        <p>Jakarta (CGK) to Singapore (SIN)</p>
        <div className="flex gap-2 items-center">
          <p>Total Travel Time</p>
          <div
            className={`bg-primary-background text-primary text-sm font-medium font-['Plus Jakarta Sans'] leading-tight p-2 rounded-lg`}
          >
            1h 55m
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-primary text-xs font-semibold font-['Plus Jakarta Sans'] leading-none">
                Actual
              </p>
              <p className="text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                10.30
              </p>
              <p className="text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Jan 16
              </p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-primary text-xs font-semibold font-['Plus Jakarta Sans'] leading-none">
                Actual
              </p>
              <p className="text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                13.20
              </p>
              <p className="text-sm font-medium font-['Plus Jakarta Sans'] leading-tight">
                Jan 16
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <img src={Circle} alt="" />
            <div className="border-l border-dashed h-52 border-primary" />
            <img src={AirplaneVerticalRotated} alt="" />
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex flex-col gap-2 items-start ">
              <p className="text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                Jakarta (CGK), Indonesia
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                Soekarno Hatta International
              </p>
              <p className="text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                Terminal 4
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start ">
              <p className="text-lg font-semibold font-['Plus Jakarta Sans'] leading-7">
                Jakarta (CGK), Indonesia
              </p>
              <p className="text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                Soekarno Hatta International
              </p>
              <p className="text-gray-500 text-sm font-normal font-['Plus Jakarta Sans'] leading-tight">
                Terminal 4
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
