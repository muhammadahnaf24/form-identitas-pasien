<script setup>
import { reactive, computed, toRef, ref, onMounted, watch } from "vue";
import BaseSignaturePad from "@/components/BaseSignaturePad.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import PasienLabel from "@/components/PasienLabel.vue";
import CetakIdentitas from "@/components/CetakIdentitas.vue";
import { useAgeDatefns } from "@/composables/useAgeDatefns";
import wilayahServices from "@/services/wilayahServices.js";
import BaseSelectWilayah from "@/components/BaseSelectWilayah.vue";

const router = useRouter();
const opsiStatus = ["Kawin", "Belum Kawin", "Janda", "Duda"];
const opsiAgama = ["Islam", "Kristen", "Katolik", "Hindu", "Budha", "Lainnya"];
const opsiPendidikan = ["SD", "SLTP", "SLTA", "Perguruan Tinggi", "Lainnya"];
const opsiHubungan = [
  "Diri Sendiri",
  "Suami",
  "Istri",
  "Orang Tua",
  "Anak",
  "Lainnya",
];
const opsiGender = [
  { label: "Laki-laki", value: "Laki-laki" },
  { label: "Perempuan", value: "Perempuan" },
];

const form = reactive({
  identitas: {
    noRm: "",
    nik: "",
    namaLengkap: "",
    namaPanggilan: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    status: "",
    agama: "",
    pendidikan: "",
    pekerjaan: "",
    noHp: "",
    umurTahun: 0,
    umurBulan: 0,
    umurHari: 0,
  },

  alamat: {
    alamatJalan: "",
    rt: "",
    rw: "",
    provinsiId: "",
    provinsi: "",
    kabupatenId: "",
    kabupaten: "",
    kecamatanId: "",
    kecamatan: "",
    desaId: "",
    desa: "",
  },

  darurat: {
    nama: "",
    hubungan: "",
    hp1: "",
    hp2: "",
    alamatJalan: "",
    rt: "",
    rw: "",
    provinsiId: "",
    provinsi: "",
    kabupatenId: "",
    kabupaten: "",
    kecamatanId: "",
    kecamatan: "",
    desaId: "",
    desa: "",
  },
  tandaTangan: "",
});

const listWilayah = reactive({
  pasien: { provinsi: [], kabupaten: [], kecamatan: [], desa: [] },
  darurat: { provinsi: [], kabupaten: [], kecamatan: [], desa: [] },
});

const tglLahirRef = toRef(form.identitas, "tanggalLahir");
const { umurTahun, umurBulan, umurHari } = useAgeDatefns(tglLahirRef);

const tanggalHariIni = computed(() => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date(),
  );
});

const handleChangeWilayah = async (kategori, level, newVal) => {
  const targetList = listWilayah[kategori]; // pasien atau darurat
  const targetForm = kategori === "pasien" ? form.alamat : form.darurat;

  // 1. Simpan NAMA wilayah (Untuk kebutuhan backend/cetak)
  if (newVal) {
    const selectedItem = targetList[level].find((item) => item.id === newVal);
    if (selectedItem) targetForm[level] = selectedItem.name;
  } else {
    targetForm[level] = "";
  }

  // 2. Logic Fetching Data Anak (Chain)
  try {
    if (level === "provinsi") {
      // Reset anak-anaknya
      targetForm.kabupatenId = "";
      targetForm.kabupaten = "";
      targetList.kabupaten = [];
      targetForm.kecamatanId = "";
      targetForm.kecamatan = "";
      targetList.kecamatan = [];
      targetForm.desaId = "";
      targetForm.desa = "";
      targetList.desa = [];

      if (newVal) {
        const res = await wilayahServices.getRegencies(newVal);
        targetList.kabupaten = res.data;
      }
    } else if (level === "kabupaten") {
      targetForm.kecamatanId = "";
      targetForm.kecamatan = "";
      targetList.kecamatan = [];
      targetForm.desaId = "";
      targetForm.desa = "";
      targetList.desa = [];

      if (newVal) {
        const res = await wilayahServices.getDistricts(newVal);
        targetList.kecamatan = res.data;
      }
    } else if (level === "kecamatan") {
      targetForm.desaId = "";
      targetForm.desa = "";
      targetList.desa = [];

      if (newVal) {
        const res = await wilayahServices.getVillages(newVal);
        targetList.desa = res.data;
      }
    }
  } catch (error) {
    console.error(`Gagal mengambil data ${level} untuk ${kategori}:`, error);
  }
};

watch(
  () => form.alamat.provinsiId,
  (val) => handleChangeWilayah("pasien", "provinsi", val),
);
watch(
  () => form.alamat.kabupatenId,
  (val) => handleChangeWilayah("pasien", "kabupaten", val),
);
watch(
  () => form.alamat.kecamatanId,
  (val) => handleChangeWilayah("pasien", "kecamatan", val),
);
watch(
  () => form.alamat.desaId,
  (val) => handleChangeWilayah("pasien", "desa", val),
);

// Darurat
watch(
  () => form.darurat.provinsiId,
  (val) => handleChangeWilayah("darurat", "provinsi", val),
);
watch(
  () => form.darurat.kabupatenId,
  (val) => handleChangeWilayah("darurat", "kabupaten", val),
);
watch(
  () => form.darurat.kecamatanId,
  (val) => handleChangeWilayah("darurat", "kecamatan", val),
);
watch(
  () => form.darurat.desaId,
  (val) => handleChangeWilayah("darurat", "desa", val),
);

// --- LOGIC "SAMA DENGAN PASIEN" (BEST PRACTICE: ASYNC) ---
const isSameAddress = ref(false);

const copyAddressToDarurat = async () => {
  if (!isSameAddress.value) return;

  // 1. Copy Text Manual
  form.darurat.alamatJalan = form.alamat.alamatJalan;
  form.darurat.rt = form.alamat.rt;
  form.darurat.rw = form.alamat.rw;

  // 2. Copy Wilayah Bertahap (Sequence)
  // Kita copy ID provinsi dulu
  form.darurat.provinsiId = form.alamat.provinsiId;

  // Kita tunggu sebentar atau pastikan list kabupaten terisi sebelum set ID kabupaten
  // Karena watcher di atas sudah async, kita perlu sedikit trik agar urutan terjaga
  // Cara paling robust tanpa watcher hell adalah memanggil service manual di sini:

  if (form.alamat.provinsiId) {
    // A. Load Kabupaten Darurat
    const resKab = await wilayahServices.getRegencies(form.alamat.provinsiId);
    listWilayah.darurat.kabupaten = resKab.data;
    form.darurat.kabupatenId = form.alamat.kabupatenId; // Set ID setelah list ada

    if (form.alamat.kabupatenId) {
      // B. Load Kecamatan Darurat
      const resKec = await wilayahServices.getDistricts(
        form.alamat.kabupatenId,
      );
      listWilayah.darurat.kecamatan = resKec.data;
      form.darurat.kecamatanId = form.alamat.kecamatanId;

      if (form.alamat.kecamatanId) {
        // C. Load Desa Darurat
        const resDesa = await wilayahServices.getVillages(
          form.alamat.kecamatanId,
        );
        listWilayah.darurat.desa = resDesa.data;
        form.darurat.desaId = form.alamat.desaId;
      }
    }
  }
};

watch(isSameAddress, (val) => {
  if (val) {
    copyAddressToDarurat();
  } else {
    // Optional: Reset form darurat jika uncheck
    // Object.assign(form.darurat, { provinsiId: "", kabupatenId: "", ... });
  }
});

// --- MOUNTED ---
onMounted(async () => {
  try {
    const res = await wilayahServices.getProvinces();
    listWilayah.pasien.provinsi = res.data;
    listWilayah.darurat.provinsi = res.data; // Isi juga list darurat
  } catch (e) {
    console.error(e);
  }
});

const handleSignatureUpdate = (dataUrl) => {
  form.tandaTangan = dataUrl;
};

const handleSubmit = () => {
  form.identitas.umurTahun = umurTahun.value;
  form.identitas.umurBulan = umurBulan.value;

  // Payload sudah rapi, berisi ID dan Nama Wilayah
  console.log("PAYLOAD FINAL:", JSON.stringify(form, null, 2));
  alert("Data Tersimpan! (Cek Console)");
};

const handlePrint = () => {
  if (!form.identitas.namaLengkap) {
    alert("Mohon isi Nama Lengkap sebelum mencetak.");
    return;
  }
  window.print();
};
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <div
      class="mb-8 flex items-center justify-between border-b border-gray-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900 leading-tight">
          Formulir Identitas Pasien
        </h1>
        <p class="text-sm text-gray-500 mt-1">Pendaftaran Pasien Baru</p>
      </div>
      <div>
        <span
          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
        >
          Rev01 RM01
        </span>
      </div>
    </div>
    <PasienLabel :pasien-data="form" />
    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2
            class="text-base font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-2 mb-6 flex items-center gap-2"
          >
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-700"
              >1</span
            >
            Identitas Pasien
          </h2>

          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <BaseInput
                v-model="form.identitas.noRm"
                label="No. Rekam Medis"
              />
            </div>
            <div class="sm:col-span-3">
              <BaseInput
                v-model="form.identitas.nik"
                label="Nomor Induk Kependudukan (NIK)"
                type="number"
              />
            </div>
            <div class="sm:col-span-4">
              <BaseInput
                v-model="form.identitas.namaLengkap"
                label="Nama Lengkap (Sesuai KTP)"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseInput
                v-model="form.identitas.namaPanggilan"
                label="Nama Panggilan"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseInput
                v-model="form.identitas.tempatLahir"
                label="Tempat Lahir"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseInput
                v-model="form.identitas.tanggalLahir"
                label="Tanggal Lahir"
                type="date"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium leading-6 mb-1"
                >Umur</label
              >
              <div class="flex gap-2">
                <BaseInput
                  :model-value="umurTahun"
                  suffix="Thn"
                  type="number"
                />
                <BaseInput
                  :model-value="umurBulan"
                  suffix="Bln"
                  type="number"
                />
                <BaseInput :model-value="umurHari" suffix="Hr" type="number" />
              </div>
            </div>
            <div class="sm:col-span-2">
              <BaseRadioGroup
                v-model="form.identitas.jenisKelamin"
                label="Jenis Kelamin"
                :options="opsiGender"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseSelect
                v-model="form.identitas.status"
                label="Status Pernikahan"
                :options="opsiStatus"
                placeholder="Pilih"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseSelect
                v-model="form.identitas.agama"
                label="Agama"
                :options="opsiAgama"
                placeholder="Pilih"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseSelect
                v-model="form.identitas.pendidikan"
                label="Pendidikan"
                :options="opsiPendidikan"
                placeholder="Pilih"
              />
            </div>
            <div class="sm:col-span-2">
              <BaseInput v-model="form.identitas.pekerjaan" label="Pekerjaan" />
            </div>
            <div class="sm:col-span-2">
              <BaseInput v-model="form.identitas.noHp" label="No. Telp/HP" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2
            class="text-base font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-2 mb-6 flex items-center gap-2"
          >
            <span
              class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-700"
              >2</span
            >
            Alamat Domisili
          </h2>
          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-12">
            <div class="sm:col-span-6">
              <BaseSelectWilayah
                v-model="form.alamat.provinsiId"
                label="Provinsi"
                :options="listWilayah.pasien.provinsi"
                placeholder="Pilih Provinsi"
              />
            </div>

            <div class="sm:col-span-6">
              <BaseSelectWilayah
                v-model="form.alamat.kabupatenId"
                label="Kabupaten / Kota"
                :options="listWilayah.pasien.kabupaten"
                placeholder="Pilih Kabupaten"
                :disabled="!form.alamat.provinsi"
              />
            </div>

            <div class="sm:col-span-6">
              <BaseSelectWilayah
                v-model="form.alamat.kecamatanId"
                label="Kecamatan"
                :options="listWilayah.pasien.kecamatan"
                placeholder="Pilih Kecamatan"
                :disabled="!form.alamat.kabupaten"
              />
            </div>

            <div class="sm:col-span-6">
              <BaseSelectWilayah
                v-model="form.alamat.desaId"
                label="Desa / Kelurahan"
                :options="listWilayah.pasien.desa"
                placeholder="Pilih Desa"
                :disabled="!form.alamat.kecamatan"
              />
            </div>
            <div class="sm:col-span-6">
              <BaseInput v-model="form.alamat.alamatJalan" label="Dusun" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput v-model="form.alamat.rt" label="RT" type="number" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput v-model="form.alamat.rw" label="RW" type="number" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <div
            class="flex justify-between items-center border-b border-gray-100 pb-2 mb-6"
          >
            <h2
              class="text-base font-semibold leading-7 text-gray-900 flex items-center gap-2"
            >
              <span
                class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-700"
                >3</span
              >
              Kontak Darurat
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <BaseInput v-model="form.darurat.nama" label="Nama Keluarga" />
            </div>
            <div class="sm:col-span-3">
              <BaseSelect
                v-model="form.darurat.hubungan"
                label="Hubungan"
                :options="opsiHubungan"
              />
            </div>

            <div class="sm:col-span-6">
              <div
                class="flex items-center justify-between mb-4 border-b border-gray-200 pb-2"
              >
                <p class="text-xs font-semibold text-gray-500">
                  Alamat Kerabat
                </p>
                <label
                  class="flex items-center gap-2 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    v-model="isSameAddress"
                    class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <span
                    class="text-xs font-medium text-gray-500 group-hover:text-blue-600"
                    >Sama dengan Pasien</span
                  >
                </label>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div class="sm:col-span-6">
                  <BaseSelectWilayah
                    v-model="form.darurat.provinsiId"
                    label="Provinsi"
                    :options="listWilayah.darurat.provinsi"
                    placeholder="Pilih Provinsi"
                    :disabled="isSameAddress"
                  />
                </div>

                <div class="sm:col-span-6">
                  <BaseSelectWilayah
                    v-model="form.darurat.kabupatenId"
                    label="Kabupaten / Kota"
                    :options="listWilayah.darurat.kabupaten"
                    placeholder="Pilih Kabupaten"
                    :disabled="!form.darurat.provinsiId || isSameAddress"
                  />
                </div>

                <div class="sm:col-span-6">
                  <BaseSelectWilayah
                    v-model="form.darurat.kecamatanId"
                    label="Kecamatan"
                    :options="listWilayah.darurat.kecamatan"
                    placeholder="Pilih Kecamatan"
                    :disabled="!form.darurat.kabupatenId || isSameAddress"
                  />
                </div>

                <div class="sm:col-span-6">
                  <BaseSelectWilayah
                    v-model="form.darurat.desaId"
                    label="Desa / Kelurahan"
                    :options="listWilayah.darurat.desa"
                    placeholder="Pilih Desa"
                    :disabled="!form.darurat.kecamatanId || isSameAddress"
                  />
                </div>
                <div class="sm:col-span-6">
                  <BaseInput v-model="form.darurat.alamatJalan" label="Dusun" />
                </div>
                <div class="sm:col-span-3">
                  <BaseInput
                    v-model="form.darurat.rt"
                    label="RT"
                    type="number"
                  />
                </div>
                <div class="sm:col-span-3">
                  <BaseInput
                    v-model="form.darurat.rw"
                    label="RW"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div class="sm:col-span-3">
              <BaseInput v-model="form.darurat.hp1" label="No. Telp/HP 1" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput v-model="form.darurat.hp2" label="No. Telp/HP 2" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden p-6"
      >
        <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
          DATA TERSEBUT DIBUAT SEBENAR-BENARNYA UNTUK DIGUNAKAN SEBAGAIMANA
          MESTINYA, SERTA BERSEDIA UNTUK MENGIKUTI PERATURAN YANG ADA DI RUMAH
          SAKIT KRISTEN NGESTI WALUYO PARAKAN
        </p>
        <div class="flex flex-col sm:flex-row justify-between items-end gap-6">
          <div
            class="w-full sm:w-1/2 flex flex-col items-center sm:items-start"
          >
            <p class="text-sm text-gray-800 mb-1">
              Parakan, <span class="font-semibold">{{ tanggalHariIni }}</span>
            </p>
            <p class="text-sm font-bold text-gray-900 mb-4">Yang Menyatakan,</p>
            <div class="w-full">
              <BaseSignaturePad @update:signature="handleSignatureUpdate" />
            </div>
            <p
              class="text-sm font-bold text-gray-900 mt-4 uppercase border-b border-black inline-block pb-1 min-w-50 text-center sm:text-left"
            >
              {{ form.namaLengkap || "( Nama Lengkap )" }}
            </p>
          </div>
          <div class="w-full sm:w-auto flex flex-row gap-2">
            <!-- <button
              type="button"
              @click="handlePrint"
              class="flex-1 rounded-md bg-white border border-gray-300 px-8 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
                />
              </svg>
              Cetak PDF
            </button> -->
          </div>
        </div>
        <div class="mt-8">
          <button
            type="submit"
            class="w-full rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Simpan Data
          </button>
        </div>
      </div>
    </form>
  </div>
  <CetakIdentitas :data="form" />
</template>
