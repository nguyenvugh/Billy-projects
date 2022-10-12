import "./style.css";
import { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Loader from "app/components/Loader";
import { Modal } from "@material-ui/core";

const Loading = memo(() => {
  const loading = useSelector((store) => store.loading.loading);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        loading && document.getElementById("loading")?.classList?.add("active");
      }, 1000);
    }
  }, [loading]);

  if (!loading) return null;
  return (
    <Modal open={true} hideBackdrop >
      <div className="loading-overlay" id="loading">
        <Loader />
      </div>
    </Modal>
  )
});

export default Loading;
