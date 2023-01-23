import React from "react";
import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import ReactDOM from "react-dom/client";

export type CustomToastMode = "success" | "warning" | "danger";

export interface CustomToastProps {
  message: string;
  mode: CustomToastMode;
  showForMs: number;
  withImage?: string;
}

const TOAST_CONTAINER_ID = "toast" as const;

export function spawnCustomToast(
  props: CustomToastProps,
  containerId: string = TOAST_CONTAINER_ID
) {
  let container = document.getElementById(containerId) as Element;

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", containerId);
    document.body.appendChild(container);
  }
  const root = ReactDOM.createRoot(container);
  root.render(
    <CustomToast
      message={props.message}
      mode={props.mode}
      showForMs={props.showForMs}
      withImage={props.withImage}
    />
  );

  setTimeout(() => root.unmount(), props.showForMs);
}

export const CustomToast: React.FC<CustomToastProps> = ({ message, mode, withImage }) => {
  const title = mode.toUpperCase();

  const image = withImage && (
    <img
      style={{ backgroundColor: "white", margin: "0.5em" }}
      src={withImage}
      height="30px"
      alt="passedImage"
    />
  );

  return (
    <ToastContainer position={"top-end"} className={"p-3"}>
      <Toast data-testid={"custom-toast"} animation bg={mode}>
        <ToastHeader className={"d-flex justify-content-between"}>{title}</ToastHeader>
        <ToastBody
          className={
            "text-white d-flex flex-row align-items-center justify-content-center"
          }
        >
          {image}
          {message}
        </ToastBody>
      </Toast>
    </ToastContainer>
  );
};
