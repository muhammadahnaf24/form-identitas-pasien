import { ref, watch, toValue, isRef } from "vue";
import { intervalToDuration } from "date-fns";
import Swal from "sweetalert2";

export function useAgeDatefns(tanggalLahirRef) {
  const umurTahun = ref(0);
  const umurBulan = ref(0);
  const umurHari = ref(0);

  const hitungUmur = (tglLahir) => {
    // Reset jika kosong
    if (!tglLahir) {
      umurTahun.value = 0;
      umurBulan.value = 0;
      umurHari.value = 0;
      return;
    }

    const lahir = new Date(tglLahir);
    const hariIni = new Date();

    lahir.setHours(0, 0, 0, 0);
    hariIni.setHours(0, 0, 0, 0);

    if (lahir > hariIni) {
      Swal.fire({
        icon: "error",
        title: "Tanggal Tidak Valid",
        text: "Tanggal lahir tidak boleh melebihi hari ini!",
        confirmButtonColor: "#d33",
        confirmButtonText: "Oke, ganti",
      });

      umurTahun.value = 0;
      umurBulan.value = 0;
      umurHari.value = 0;

      if (isRef(tanggalLahirRef)) {
        tanggalLahirRef.value = "";
      }

      return;
    }

    const duration = intervalToDuration({
      start: lahir,
      end: new Date(),
    });

    umurTahun.value = duration.years || 0;
    umurBulan.value = duration.months || 0;
    umurHari.value = duration.days || 0;
  };

  watch(
    () => toValue(tanggalLahirRef),
    (newVal) => hitungUmur(newVal),
    { immediate: true },
  );

  return {
    umurTahun,
    umurBulan,
    umurHari,
  };
}
