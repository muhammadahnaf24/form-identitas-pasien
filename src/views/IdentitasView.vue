<script setup>
import {
  reactive,
  computed,
  toRef,
  ref,
  watchEffect,
  onMounted,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAgeDatefns } from "@/composables/useAgeDatefns";
import apiService from "@/services/apiService.js";
import BaseInput from "@/components/BaseInput.vue";
import BaseSignaturePad from "@/components/BaseSignaturePad.vue";
import CetakIdentitas from "@/components/CetakIdentitas.vue";
import html2pdf from "html2pdf.js";
import BaseButton from "@/components/BaseButton.vue";
import { alertError, alertAutoClose, alertSuccess } from "@/utils/swal";

const route = useRoute();
const router = useRouter();

const isLoadingData = ref(true);
const isSaving = ref(false);
const isSendingPdf = ref(false);
const pdfContentRef = ref(null);

// Form Reactive
const form = reactive({
  noReg: "",
  noRm: "",
  nik: "",
  namaLengkap: "",
  namaPanggilan: "",
  tempatLahir: "",
  tanggalLahir: "",
  umurTahun: "",
  umurBulan: "",
  jenisKelamin: "",
  status: "",
  agama: "",
  pendidikan: "",
  pekerjaan: "",
  noHp: "",

  alamat: "",
  rt: "",
  rw: "",
  desa: "",
  kecamatan: "",
  kabupaten: "",
  provinsi: "",

  daruratNama: "",
  hubungan: "",
  daruratHp1: "",
  daruratHp2: "",
  daruratAlamat: "",
  daruratRt: "",
  daruratRw: "",
  daruratDesa: "",
  daruratKecamatan: "",
  daruratKabupaten: "",

  tandaTangan: "",
});

const tglLahirRef = toRef(form, "tanggalLahir");
const { umurTahun, umurBulan, umurHari } = useAgeDatefns(tglLahirRef);
const handlePrint = () => {
  if (!form.namaLengkap) {
    alertError(
      "Data Belum Lengkap",
      "Mohon isi Nama Lengkap sebelum mencetak.",
    );
    return;
  }
  const originalTitle = document.title;
  const safeName = form.namaLengkap.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  document.title = `${form.noReg} - ${safeName}`;

  window.print();

  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
};

watchEffect(() => {
  form.umurTahun = umurTahun.value;
  form.umurBulan = umurBulan.value;
  form.umurHari = umurHari.value;
});

const tanggalHariIni = computed(() => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date(),
  );
});

onMounted(async () => {
  const noRegParam = route.query.reg;

  if (!noRegParam) {
    alertError("Error", "Nomor Registrasi tidak ditemukan.");
    router.push({ name: "noRegistrasi" });
    return;
  }

  form.noReg = noRegParam;

  try {
    isLoadingData.value = true;

    const response = await apiService.getPasien(noRegParam);

    if (response.data.success) {
      const data = response.data.data;
      form.noReg = data.vc_no_reg || "";
      form.noRm = data.vc_no_rm || "";
      form.nik = data.vc_nik || "";
      form.namaLengkap = data.vc_nama_p || "";
      form.namaPanggilan = data.vc_nama_p || "";
      form.tempatLahir = data.vc_tp_lhr || "";
      form.tanggalLahir = data.dt_tgl_lhr.split("T")[0];
      form.status = data.vc_stkawin || "";
      form.agama = data.vc_agama || "";
      if (data.vc_jenis_k === "P" || data.vc_jenis_k === "2") {
        form.jenisKelamin = "Perempuan";
      } else if (data.vc_jenis_k === "L" || data.vc_jenis_k === "1") {
        form.jenisKelamin = "Laki-laki";
      } else {
        form.jenisKelamin = "";
      }
      form.pendidikan = data.vc_pendidikan || "";
      form.pekerjaan = data.vc_pekerjaan || "";
      form.noHp = data.vc_telpon || "";

      form.alamat = data.vc_alamat || "";
      form.rt = data.rt || "";
      form.rw = data.rw || "";
      form.desa = data.vc_kelurahan || "";
      form.kecamatan = data.vc_kecamatan || "";
      form.kabupaten = data.vc_kota || "";
      form.provinsi = data.vc_propinsi || "";

      form.daruratNama = data.vc_n_wali || "";
      form.hubungan = data.vc_hubungan || "";
      form.daruratHp1 = data.vc_telpon || "";
      form.daruratHp2 = data.vc_telpon || "";
      form.daruratAlamat = data.vc_alamat_w || "";
    } else {
      alertError("Data Tidak Ditemukan", "Data pasien tidak ditemukan.");

      router.push({ name: "noRegistrasi" });
    }
  } catch (error) {
    console.error("Gagal mengambil data pasien", error);

    alertError("Gagal Memuat Data", "Terjadi kesalahan sistem.");
  } finally {
    setTimeout(() => {
      isLoadingData.value = false;
    }, 500);
  }
});

const handleSignatureUpdate = (dataUrl) => {
  form.tandaTangan = dataUrl;
};

const handleSubmit = async () => {
  if (!form.tandaTangan) {
    alertError(
      "Tanda Tangan Belum Ada",
      "Mohon sertakan tanda tangan digital.",
    );
    return;
  }

  isSaving.value = true;
  try {
    console.log("Mengirim Data:", form);
    setTimeout(() => {
      alertSuccess(
        "Berhasil",
        "Data identitas pasien berhasil disimpan.",
        1500,
      );
      isSaving.value = false;
    }, 1000);
  } catch (error) {
    console.error(error);

    alertError("Gagal", "Terjadi kesalahan saat menyimpan data.");
    isSaving.value = false;
  }
};

const handleBack = () => {
  setTimeout(() => {
    router;
  }, 1000);
  router.push({ name: "noRegistrasi" });
};

const handleSaveAsPdf = async () => {
  if (!form.tandaTangan) {
    alertError(
      "Tanda Tangan Belum Ada",
      "Mohon sertakan tanda tangan digital agar dokumen sah.",
    );
    return;
  }

  isSendingPdf.value = true;

  try {
    const element = pdfContentRef.value?.$el || pdfContentRef.value;

    if (!element) {
      throw new Error("Template PDF tidak ditemukan (Ref Error).");
    }

    const safeName = form.namaLengkap
      ? form.namaLengkap.replace(/[^a-zA-Z0-9]/g, "_")
      : "Pasien";
    const fileName = `Identitas_${form.noReg}_${safeName}.pdf`;

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Resolusi 2x (High DPI) agar teks tajam
        useCORS: true, // Wajib agar gambar Logo/Tanda Tangan bisa dirender
        scrollY: 0, // Mencegah hasil terpotong jika user sedang scroll ke bawah
        logging: false,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    // 5. Eksekusi Generate & Download
    // Fungsi .save() akan otomatis mendownload file ke komputer user
    await html2pdf().set(opt).from(element).save();

    // 6. Notifikasi Sukses
    alertAutoClose(
      "Berhasil Disimpan",
      "File PDF telah didownload ke perangkat Anda.",
      "success",
      2000,
    );
  } catch (error) {
    console.error("Gagal generate PDF:", error);
    alertError("Gagal", "Terjadi kesalahan saat memproses file PDF.");
  } finally {
    isSendingPdf.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans print:hidden"
  >
    <div
      class="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          Formulir Identitas Pasien
        </h1>
        <p class="text-sm text-gray-500 mt-1">Data pasien</p>
      </div>
      <BaseButton type="button" variant="sky" @click="handleBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Kembali
      </BaseButton>
    </div>

    <div
      v-if="isLoadingData"
      class="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
    >
      <div
        class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-sky-600 mb-4"
      ></div>
      <p class="text-gray-500 font-medium">Memuat Data Pasien...</p>
    </div>

    <form
      v-else
      @submit.prevent="handleSubmit"
      class="max-w-5xl mx-auto space-y-8"
    >
      <div
        class="bg-linear-to-br from-sky-50 to-white rounded-xl p-6 border border-sky-100 ring-1 ring-sky-50 mb-6"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="flex items-start gap-4">
            <div
              class="p-3 bg-white rounded-xl shadow-sm text-sky-600 ring-1 ring-sky-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <p
                class="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1"
              >
                No. Registrasi
              </p>
              <p class="text-2xl font-bold text-gray-900 tracking-tight">
                {{ form.noReg }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div
              class="p-3 bg-white rounded-xl shadow-sm text-sky-600 ring-1 ring-sky-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.5 2-2 2h4c-1.5 0-2-1.116-2-2z"
                />
              </svg>
            </div>
            <div class="w-full">
              <p
                class="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-1"
              >
                No. Rekam Medis
              </p>

              <p class="text-2xl font-bold text-gray-900 tracking-tight">
                {{ form.noRm || "-" }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <section
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div
          class="bg-sky-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3"
        >
          <div
            class="h-8 w-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm"
          >
            1
          </div>
          <h2 class="text-lg font-bold text-gray-800">Identitas Pasien</h2>
        </div>

        <div
          class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          <div class="lg:col-span-8">
            <BaseInput
              v-model="form.namaLengkap"
              label="Nama Lengkap (Sesuai KTP)"
            />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.namaPanggilan" label="Nama Panggilan" />
          </div>

          <div class="lg:col-span-4">
            <BaseInput v-model="form.tempatLahir" label="Tempat Lahir" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.tanggalLahir" label="Tanggal Lahir" />
          </div>
          <div class="lg:col-span-4">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Umur (Otomatis)</label
            >
            <div class="flex gap-2">
              <div class="relative w-full">
                <BaseInput v-model="form.umurTahun" />
                <span
                  class="absolute right-3 top-2 text-xs text-gray-400 font-medium"
                  >Thn</span
                >
              </div>
              <div class="relative w-full">
                <BaseInput v-model="form.umurBulan" />
                <span
                  class="absolute right-3 top-2 text-xs text-gray-400 font-medium"
                  >Bln</span
                >
              </div>
            </div>
          </div>

          <div class="lg:col-span-4">
            <BaseInput v-model="form.jenisKelamin" label="Jenis Kelamin" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.status" label="Status Perkawinan" />
          </div>

          <div class="lg:col-span-4">
            <BaseInput v-model="form.agama" label="Agama" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.pendidikan" label="Pendidikan Terakhir" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.pekerjaan" label="Pekerjaan" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput
              v-model="form.noHp"
              label="Nomor Telepon / WhatsApp"
              type="tel"
            />
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div
          class="bg-sky-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3"
        >
          <div
            class="h-8 w-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm"
          >
            2
          </div>
          <h2 class="text-lg font-bold text-gray-800">Alamat Domisili</h2>
        </div>
        <div
          class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          <div class="lg:col-span-8">
            <BaseInput v-model="form.alamat" label="Alamat Jalan / Dusun" />
          </div>
          <!-- <div class="lg:col-span-2">
            <BaseInput v-model="form.rt" label="RT" type="number" />
          </div>
          <div class="lg:col-span-2">
            <BaseInput v-model="form.rw" label="RW" type="number" />
          </div> -->

          <div class="lg:col-span-4">
            <BaseInput v-model="form.desa" label="Desa / Kelurahan" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.kecamatan" label="Kecamatan" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.kabupaten" label="Kabupaten / Kota" />
          </div>
          <div class="lg:col-span-4">
            <BaseInput v-model="form.provinsi" label="Provinsi" />
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div
          class="bg-sky-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3"
        >
          <div
            class="h-8 w-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm"
          >
            3
          </div>
          <h2 class="text-lg font-bold text-gray-800">Kontak Darurat</h2>
        </div>
        <div
          class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          <div class="lg:col-span-6">
            <BaseInput
              v-model="form.daruratNama"
              label="Nama Kerabat / Keluarga"
            />
          </div>
          <div class="lg:col-span-6">
            <BaseInput v-model="form.hubungan" label="Hubungan dengan Pasien" />
          </div>

          <div class="lg:col-span-12">
            <BaseInput v-model="form.daruratAlamat" label="Alamat Kerabat" />
          </div>

          <div class="lg:col-span-6">
            <BaseInput
              v-model="form.daruratHp1"
              label="No. Telp Utama"
              type="tel"
            />
          </div>
          <div class="lg:col-span-6">
            <BaseInput
              v-model="form.daruratHp2"
              label="No. Telp Alternatif (Opsional)"
              type="tel"
            />
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div
          class="bg-sky-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3"
        >
          <div
            class="h-8 w-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-sm"
          >
            4
          </div>
          <h2 class="text-lg font-bold text-gray-800">
            Pernyataan & Tanda Tangan
          </h2>
        </div>
        <div class="p-6 md:p-8">
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div class="flex">
              <div class="shrink-0">
                <svg
                  class="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 01-1-1v-4a1 1 0 112 0v4a1 1 0 01-1 1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-yellow-700">
                  Saya menyatakan bahwa data yang saya isikan di atas adalah
                  benar dan dapat dipertanggungjawabkan. Saya bersedia mengikuti
                  peraturan yang berlaku di RS Kristen Ngesti Waluyo.
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-8 items-end">
            <div class="w-full md:w-1/2">
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Tanda Tangan Digital <span class="text-red-500">*</span>
                <span class="text-xs font-normal text-gray-500 ml-1"
                  >(Gunakan jari atau mouse)</span
                >
              </label>
              <div class="border border-gray-300 rounded-lg overflow-hidden">
                <BaseSignaturePad @update:signature="handleSignatureUpdate" />
              </div>
            </div>
            <div class="w-full md:w-1/2 text-center md:text-left">
              <p class="text-sm text-gray-600 mb-1">
                Parakan,
                <span class="font-semibold text-gray-900">{{
                  tanggalHariIni
                }}</span>
              </p>
              <p class="text-sm font-bold text-gray-900 mb-8">
                Yang Menyatakan,
              </p>
              <div
                class="border-b border-gray-300 pb-1 inline-block min-w-50 text-center"
              >
                <span class="text-m font-bold text-gray-800 uppercase">{{
                  form.daruratNama || "( Nama Lengkap )"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        class="flex flex-col-reverse sm:flex-row justify-end items-center gap-4 pt-6 pb-12"
      >
        <BaseButton
          type="button"
          variant="white"
          rounded="rounded-xl"
          @click="handlePrint"
        >
          CETAK MANUAL
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 transition-colors group-hover:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
          </template>
        </BaseButton>

        <BaseButton
          type="button"
          variant="emerald"
          rounded="rounded-xl"
          :loading="isSendingPdf"
          loading-text="Mengirim PDF..."
          @click="handleSaveAsPdf"
        >
          KIRIM PDF
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </template>
        </BaseButton>

        <BaseButton
          type="submit"
          :loading="isSaving"
          loading-text="Menyimpan..."
        >
          SIMPAN DATA
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          </template>
        </BaseButton>
      </div>
    </form>
  </div>
  <CetakIdentitas :data="form" ref="pdfContentRef" />
</template>
