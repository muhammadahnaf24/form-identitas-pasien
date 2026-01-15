import { ref, watch } from "vue";

export function useAge(tanggalLahirRef) {
  const umurTahun = ref("");
  const umurBulan = ref("");

  const hitungUmur = (tglLahir) => {
    if (!tglLahir) return;

    const lahir = new Date(tglLahir);
    const hariIni = new Date();

    let tahun = hariIni.getFullYear() - lahir.getFullYear();
    let bulan = hariIni.getMonth() - lahir.getMonth();
    let tanggal = hariIni.getDate() - lahir.getDate();

    if (bulan < 0 || (bulan === 0 && tanggal < 0)) {
      tahun--;
      bulan += 12;
    }

    if (tanggal < 0) {
      bulan--;
      if (bulan < 0) {
        tahun--;
        bulan += 12;
      }
    }

    umurTahun.value = tahun;
    umurBulan.value = bulan;
  };

  watch(tanggalLahirRef, (newVal) => {
    hitungUmur(newVal);
  });

  return {
    umurTahun,
    umurBulan,
  };
}
