<script setup>
import { useAge } from "@/composables/useAge";
import BaseSignaturePad from "@/components/BaseSignaturePad.vue";
import logoImage from "@/assets/logo.png";
import BaseInput from "@/components/BaseInput.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { reactive, computed, toRef, ref, watchEffect } from "vue";

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

// --- STATE MANAGEMENT ---
const form = reactive({
  namaLengkap: "",
  namaPanggilan: "",
  tempatLahir: "",
  tanggalLahir: "",
  umurTahun: "",
  umurBulan: "",
  status: "",
  jenisKelamin: "",
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
  daruratNama: "",
  daruratAlamat: "",
  daruratRt: "",
  daruratRw: "",
  daruratDesa: "",
  daruratKecamatan: "",
  daruratKabupaten: "",
  daruratHp1: "",
  daruratHp2: "",
  hubungan: "",
  tandaTangan: "",
});

const tglLahirRef = toRef(form, "tanggalLahir");
const { umurTahun, umurBulan } = useAge(tglLahirRef);

const tanggalHariIni = computed(() => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date()
  );
});

const handleSignatureUpdate = (dataUrl) => {
  form.tandaTangan = dataUrl;
};

const handleSubmit = () => {
  form.umurTahun = umurTahun.value;
  form.umurBulan = umurBulan.value;
  console.log("Payload:", form);
  alert("Data Pasien Berhasil Disimpan.");
};

const isSameAddress = ref(false);

watchEffect(() => {
  if (isSameAddress.value) {
    form.daruratAlamat = form.alamat;
    form.daruratRt = form.rt;
    form.daruratRw = form.rw;
    form.daruratDesa = form.desa;
    form.daruratKecamatan = form.kecamatan;
    form.daruratKabupaten = form.kabupaten;
  } else {
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 pb-20">
    <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div
        class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <div>
              <img
                :src="logoImage"
                alt="Logo RS Kristen Ngesti Waluyo"
                class="h-10 w-auto object-contain"
              />
            </div>

            <div>
              <h1 class="text-sm font-bold text-gray-900 leading-tight">
                RS KRISTEN NGESTI WALUYO
              </h1>
              <p class="text-xs text-gray-500">Formulir Identitas</p>
            </div>
          </div>

          <div class="text-right">
            <p class="text-xs text-gray-400">Rev01 RM01</p>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div class="sm:col-span-4">
                <BaseInput
                  v-model="form.namaLengkap"
                  label="Nama Lengkap (Sesuai KTP)"
                />
              </div>
              <div class="sm:col-span-2">
                <BaseInput
                  v-model="form.namaPanggilan"
                  label="Nama Panggilan"
                />
              </div>

              <div class="sm:col-span-2">
                <BaseInput v-model="form.tempatLahir" label="Tempat Lahir" />
              </div>

              <div class="sm:col-span-2">
                <BaseInput
                  v-model="form.tanggalLahir"
                  label="Tanggal Lahir"
                  type="date"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium leading-6 mb-1"
                  >Umur
                </label>

                <div class="flex gap-2">
                  <BaseInput :model-value="umurTahun" suffix="Thn" />

                  <BaseInput :model-value="umurBulan" suffix="Bln" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <BaseRadioGroup
                  v-model="form.jenisKelamin"
                  label="Jenis Kelamin"
                  :options="opsiGender"
                />
              </div>

              <div class="sm:col-span-2">
                <BaseSelect
                  v-model="form.status"
                  label="Status Pernikahan"
                  :options="opsiStatus"
                  placeholder="Pilih Status"
                />
              </div>

              <div class="sm:col-span-2">
                <BaseSelect
                  v-model="form.agama"
                  label="Agama"
                  :options="opsiAgama"
                  placeholder="Pilih Agama"
                />
              </div>

              <div class="sm:col-span-2">
                <BaseSelect
                  v-model="form.pendidikan"
                  label="Pendidikan Terakhir"
                  :options="opsiPendidikan"
                  placeholder="Pilih Pendidikan"
                />
              </div>
              <div class="sm:col-span-2">
                <BaseInput v-model="form.pekerjaan" label="Pekerjaan" />
              </div>

              <div class="sm:col-span-2">
                <BaseInput v-model="form.noHp" label="No. HP" />
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
              <div class="sm:col-span-8">
                <BaseInput v-model="form.alamat" label="Alamat" />
              </div>
              <div class="sm:col-span-2">
                <BaseInput v-model="form.rt" label="RT" type="number" />
              </div>
              <div class="sm:col-span-2">
                <BaseInput v-model="form.rw" label="RW" type="number" />
              </div>
              <div class="sm:col-span-4">
                <BaseInput v-model="form.desa" label="Desa" />
              </div>
              <div class="sm:col-span-4">
                <BaseInput v-model="form.kecamatan" label="Kecamatan" />
              </div>
              <div class="sm:col-span-4">
                <BaseInput v-model="form.kabupaten" label="Kabupaten / Kota" />
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
              <!-- <span
                class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
                >Wajib Diisi</span
              > -->
            </div>

            <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <BaseInput
                  v-model="form.daruratNama"
                  label="Nama Keluarga / Kerabat"
                />
              </div>
              <div class="sm:col-span-3">
                <BaseSelect
                  v-model="form.hubungan"
                  label="Hubungan dengan Pasien"
                  :options="opsiHubungan"
                  placeholder="Pilih Hubungan"
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
                      class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 transition cursor-pointer"
                    />
                    <span
                      class="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors"
                    >
                      Sama dengan Alamat Pasien
                    </span>
                  </label>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div class="sm:col-span-8">
                    <BaseInput v-model="form.daruratAlamat" label="Alamat" />
                  </div>
                  <div class="sm:col-span-2">
                    <BaseInput
                      v-model="form.daruratRt"
                      label="RT"
                      type="number"
                    />
                  </div>
                  <div class="sm:col-span-2">
                    <BaseInput
                      v-model="form.daruratRw"
                      label="RW"
                      type="number"
                    />
                  </div>
                  <div class="sm:col-span-4">
                    <BaseInput
                      v-model="form.daruratDesa"
                      label="Desa / Kelurahan"
                    />
                  </div>
                  <div class="sm:col-span-4">
                    <BaseInput
                      v-model="form.daruratKecamatan"
                      label="Kecamatan"
                    />
                  </div>
                  <div class="sm:col-span-4">
                    <BaseInput
                      v-model="form.daruratKabupaten"
                      label="Kabupaten / Kota"
                    />
                  </div>
                </div>
              </div>
              <div class="sm:col-span-3">
                <BaseInput v-model="form.daruratHp1" label="No. HP 1" />
              </div>
              <div class="sm:col-span-3">
                <BaseInput v-model="form.daruratHp2" label="No. HP 2" />
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

          <div
            class="flex flex-col sm:flex-row justify-between items-end gap-6"
          >
            <div
              class="w-full sm:w-1/2 flex flex-col items-center sm:items-start"
            >
              <p class="text-sm text-gray-800 mb-1">
                Parakan, <span class="font-semibold">{{ tanggalHariIni }}</span>
              </p>

              <p class="text-sm font-bold text-gray-900 mb-4">
                Yang Menyatakan,
              </p>

              <div class="w-full">
                <BaseSignaturePad @update:signature="handleSignatureUpdate" />
              </div>

              <p
                class="text-sm font-bold text-gray-900 mt-4 uppercase border-b border-black inline-block pb-1 min-w-50 text-center sm:text-left"
              >
                {{ form.namaLengkap || "( Nama Lengkap )" }}
              </p>
            </div>

            <div class="w-full sm:w-auto">
              <button
                type="submit"
                class="w-full rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>
