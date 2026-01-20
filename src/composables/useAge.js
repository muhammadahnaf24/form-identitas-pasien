import { ref, watch, toValue } from "vue";

export function useAge(tanggalLahirRef) {
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

    let tahun = hariIni.getFullYear() - lahir.getFullYear();
    let bulan = hariIni.getMonth() - lahir.getMonth();
    let hari = hariIni.getDate() - lahir.getDate();

    if (hari < 0) {
      bulan--;

      const hariBulanLalu = new Date(
        hariIni.getFullYear(),
        hariIni.getMonth(),
        0,
      ).getDate();

      hari += hariBulanLalu;
    }

    if (bulan < 0) {
      tahun--;
      bulan += 12;
    }

    umurTahun.value = tahun;
    umurBulan.value = bulan;
    umurHari.value = hari;
  };

  watch(
    () => toValue(tanggalLahirRef),
    (newVal) => {
      hitungUmur(newVal);
    },
    { immediate: true },
  );

  return {
    umurTahun,
    umurBulan,
    umurHari,
  };
}
