import Swal from "sweetalert2";

export const toastSuccess = (title) => {
  return Swal.fire({
    icon: "success",
    title: title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
};

export const alertSuccess = (title, text = "") => {
  return Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  });
};

export const alertInfo = (title, text = "") => {
  return Swal.fire({
    icon: "info",
    title: title,
    text: text,
    confirmButtonColor: "#3085d6",
  });
};

export const alertError = (title, text) => {
  return Swal.fire({
    icon: "error",
    title: title,
    text: text,
    confirmButtonColor: "#d33",
  });
};

export const confirmAction = async (
  title,
  text,
  confirmButtonText = "Ya, Lanjutkan",
) => {
  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: "Batal",
  });
  return result.isConfirmed;
};

export const alertAutoClose = (
  title,
  text = "",
  icon = "success",
  timer = 1500,
) => {
  return Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
  });
};
