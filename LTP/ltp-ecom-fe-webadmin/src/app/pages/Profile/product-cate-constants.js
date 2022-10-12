export function handleFixLinkEditorOnModal() {
  const modalBodyEl = document.querySelector(".modal-body");
  const isExistCkBodyWrapper =
    modalBodyEl.querySelector(".ck-body-wrapper") !== null;
  if (isExistCkBodyWrapper) return;
  const ckBodyWrapperEl = document.querySelector(".ck-body-wrapper");
  modalBodyEl.appendChild(ckBodyWrapperEl);
}
