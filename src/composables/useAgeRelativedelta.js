import { ref, watch } from "vue";
import { relativedelta } from "relativedelta";

export function useAgeRelativedelta(tanggalLahirRef) {
  const umurTahun = ref("");
  const umurBulan = ref("");
  const umurHari = ref("");

  const hitungUmur = (tglLahir) => {
    if (!tglLahir) return;

    const lahir = new Date(tglLahir);
    const hariIni = new Date();

    const age = relativedelta(hariIni, lahir);

    umurTahun.value = age.years;
    umurBulan.value = age.months;
    umurHari.value = age.days;
  };

  watch(tanggalLahirRef, (newVal) => {
    hitungUmur(newVal);
  });

  return {
    umurTahun,
    umurBulan,
    umurHari,
  };
}
