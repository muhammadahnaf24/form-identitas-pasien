<script setup>
import { useRouter } from "vue-router";
import { reactive, computed, toRef, ref, watchEffect } from "vue";
import { useAge } from "@/composables/useAge";
import BaseSignaturePad from "@/components/BaseSignaturePad.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseRadioGroup from "@/components/BaseRadioGroup.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import PasienLabel from "@/components/PasienLabel.vue";
import CetakIdentitas from "@/components/CetakIdentitas.vue";

const router = useRouter();
const form = reactive({
  pjNamaLengkap: "",
  pjNoIdentitas: "",
  pjAlamat: "",
  pjHubungan: "",
  pasienNamaLengkap: "",
  pasienAlamat: "",
  pasienNoRm: "",
  pasienRuangRawatInap: "",
  pernyataan: [],
  opsi3Golongan: "",
  opsi3Kelas: "",
  opsi11: "",
});

const opsiHubungan = [
  "Diri Sendiri",
  "Suami",
  "Istri",
  "Orang Tua",
  "Anak",
  "Lainnya",
];

const handleSignaturePj = (val) => (form.tandaTanganPj = val);
const handleSignatureSaksi = (val) => (form.tandaTanganSaksi = val);
const handleSignaturePasien = (val) => (form.tandaTanganPasien = val);

const handleSubmit = () => {
  console.log("Payload:", form);
  alert("Data Berhasil Disimpan");
};

const tanggalHariIni = computed(() => {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(
    new Date(),
  );
});
</script>

<template>
  <div class="max-w-5xl mx-auto space-y-8">
    <div
      class="mb-8 flex items-center justify-between border-b border-gray-200 pb-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900 leading-tight">
          Surat Pernyataan Rawat Inap
        </h1>
        <p class="text-sm text-gray-500 mt-1">Pernyataan Persetujuan</p>
      </div>
      <div>
        <span
          class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
        >
          Rev04 RM 03.02
        </span>
      </div>
    </div>

    <!-- <PasienLabel :pasien-data="form" /> -->

    <form @submit.prevent="handleSubmit" class="space-y-8">
      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2
            class="text-base font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-2 mb-6"
          >
            Yang bertanda tangan di bawah ini :
          </h2>
          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <BaseInput v-model="form.pjNamaLengkap" label="Nama" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput
                v-model="form.pjNoIdentitas"
                label="No. Identitas (KTP/SIM)"
                type="number"
              />
            </div>
            <div class="sm:col-span-4">
              <BaseInput v-model="form.pjAlamat" label="Alamat" />
            </div>
            <div class="sm:col-span-2">
              <BaseSelect
                v-model="form.pjHubungan"
                label="Hubungan dengan Pasien"
                :options="opsiHubungan"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2
            class="text-base font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-2 mb-6"
          >
            Penanggung Jawab dari Pasien :
          </h2>
          <div class="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <BaseInput v-model="form.pasienNamaLengkap" label="Nama Pasien" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput
                v-model="form.pasienNoIdentitas"
                label="No. Identitas"
                type="number"
              />
            </div>
            <div class="sm:col-span-3">
              <BaseInput v-model="form.pasienNoRm" label="No. Rekam Medis" />
            </div>
            <div class="sm:col-span-3">
              <BaseInput
                v-model="form.pasienRuangRawatInap"
                label="Ruang Rawat Inap"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden"
      >
        <div class="px-4 py-5 sm:p-6">
          <h2
            class="text-base font-semibold leading-7 text-gray-900 border-b border-gray-100 pb-2 mb-4"
          >
            Dengan ini menyatakan bahwa :
          </h2>

          <div class="space-y-4">
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="1"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS JKN PBI akan menggunakannya dan
                bersedia mengumpulkan persyaratan dalam waktu 3 x 24 jam hari
                kerja.
              </span>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="2"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS JKN PBI atau Non PBI, tetapi tidak
                akan menggunakannya dan bersedia membayar seluruh biaya
                perawatan.
              </span>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="3"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <div
                class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS JKN PBI atau Non PBI, golongan /
                kelas
                <input
                  type="text"
                  v-model="form.opsi3Golongan"
                  class="mx-1 border-b border-gray-400 focus:border-blue-600 focus:outline-none px-1 w-24 text-center bg-transparent"
                  placeholder=".........."
                />. Akan menggunakan sesuai haknya yaitu di kelas
                <input
                  type="text"
                  v-model="form.opsi3Kelas"
                  class="mx-1 border-b border-gray-400 focus:border-blue-600 focus:outline-none px-1 w-24 text-center bg-transparent"
                  placeholder=".........."
                />
                dan bersedia mengumpulkan persyaratan dalam waktu 3 x 24 jam
                hari kerja.
              </div>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="4"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI, golongan / kelas II dan
                menghendaki untuk naik ke kelas I, bersedia mengumpulkan
                persyaratan dalam waktu 3 x 24 jam hari kerja, dan bersedia
                membayar selisih tarif INA-CBGs pada kelas rawat inap kelas I
                dengan tarif INA CBGs pada kelas rawat inap kelas II.
              </span>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="5"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas II dan menghendaki
                untuk naik ke kelas VIP, bersedia mengumpulkan persyaratan dalam
                waktu 3 x 24 jam hari kerja, dan bersedia membayar iur biaya
                sebesar selisih tarif INA-CBGs antara kelas 1 dengan kelas 2
                ditambah 55% (lima puluh lima perseratus) dari tarif INA CBGs
                kelas 1 atau tarif riil rumah sakit dikurangi tarif INA CBGs
                kelas II pembayaran selisih biaya pasien adalah jumlah yang
                terendah.
              </span>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="6"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas II dan menghendaki
                untuk naik ke kelas VVIP, bersedia mengumpulkan persyaratan
                dalam waktu 3 x 24 jam hari kerja, dan bersedia membayar iur
                biaya sebesar selisih tarif INA-CBGs antara kelas 1 dengan kelas
                2 ditambah 65% (enam puluh lima perseratus) dari tarif INA CBGs
                kelas 1 atau tarif riil rumah sakit dikurangi tarif INA CBGs
                kelas II pembayaran selisih biaya pasien adalah jumlah yang
                terendah.
              </span>
            </label>

            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="7"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas II dan menghendaki
                untuk naik ke kelas EXECUTIVE, bersedia mengumpulkan persyaratan
                dalam waktu 3 x 24 jam hari kerja, dan bersedia membayar iur
                biaya sebesar selisih tarif INA-CBGs antara kelas 1 dengan kelas
                2 ditambah 75% (tujuh puluh lima perseratus).
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="8"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas I dan menghendaki
                untuk naik ke kelas VIP, bersedia mengumpulkan persyaratan dalam
                waktu 3 × 24 jam kerja, dan bersedia membayar iur biaya sebesar
                55% (lima puluh lima persen) dari tarif INA-CBGs kelas I atau
                tarif riil rumah sakit dikurangi tarif INA-CBGs kelas I,
                pembayaran selisih biaya pasien adalah jumlah yang terendah.
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="9"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas I dan menghendaki
                untuk naik ke kelas VVIP, bersedia mengumpulkan persyaratan
                dalam waktu 3 × 24 jam kerja, dan bersedia membayar iur biaya
                sebesar 65% (enam puluh lima persen) dari tarif INA-CBGs kelas I
                atau tarif riil rumah sakit dikurangi tarif INA-CBGs kelas I,
                pembayaran selisih biaya pasien adalah jumlah yang terendah.
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="10"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Memiliki kartu peserta BPJS Non PBI Kelas I dan menghendaki
                untuk naik ke kelas EXECUTIVE, bersedia mengumpulkan persyaratan
                dalam waktu 3 × 24 jam kerja, dan bersedia membayar iur biaya
                sebesar 75% (tujuh puluh lima persen) dari tarif INA-CBGs kelas
                I atau tarif riil rumah sakit dikurangi tarif INA-CBGs kelas I,
                pembayaran selisih biaya pasien adalah jumlah yang terendah.
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="11"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <div
                class="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900"
              >
                Memiliki jaminan kesehatan lain
                <input
                  type="text"
                  v-model="form.opsi11Golongan"
                  class="mx-1 border-b border-gray-400 focus:border-blue-600 focus:outline-none px-1 w-24 text-center bg-transparent"
                  placeholder=".........."
                />.
              </div>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="12"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Pasien umum (tidak memiliki / memiliki asuransi), bersedia
                membayar seluruh biaya perawatan.
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="13"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Pasien umum (memiliki kartu BPJS Kesehatan, namun tidak
                prosedural, misal: tidak termasuk kriteria kasus Penyakit Gawat
                Darurat, tidak ada kecelakaan dari Kantor Polisi setempat, dsb),
                bersedia membayar seluruh biaya perawatan
              </span>
            </label>
            <label class="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                value="14"
                v-model="form.pernyataan"
                class="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <span
                class="text-sm text-gray-700 leading-relaxed text-justify group-hover:text-gray-900"
              >
                Pembiayaan Pasien BPJS tidak dijamin oleh BPJS Kesehatan jika
                pasien ingin pulang atas permintaan sendiri, bukan atas anjuran
                dokter dan bersedia membayar seluruh biaya perawatan rumah
                sakit.
              </span>
            </label>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden p-6"
      >
        <p class="text-sm text-gray-600 leading-relaxed mb-6 text-justify">
          Demikian surat pernyataan ini saya buat dengan sebenar-benarnya
        </p>
        <p class="text-sm text-gray-800 mb-6">
          Parakan, <span class="font-semibold">{{ tanggalHariIni }}</span>
        </p>

        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3">
          <div class="flex flex-col items-center">
            <p
              class="text-xs font-semibold text-gray-900 uppercase mb-2 text-center"
            >
              Pemberi pernyataan
            </p>
            <div class="w-full bg-gray-50 border border-gray-200 rounded">
              <BaseSignaturePad @update:signature="handleSignaturePj" />
            </div>
            <p
              class="text-sm font-bold text-gray-900 mt-2 border-b border-black inline-block px-2 min-w-25 text-center"
            >
              {{ form.pjNamaLengkap || "( Nama Jelas )" }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <p
              class="text-xs font-semibold text-gray-900 uppercase mb-2 text-center"
            >
              Saksi
            </p>
            <div class="w-full bg-gray-50 border border-gray-200 rounded">
              <BaseSignaturePad @update:signature="handleSignatureSaksi" />
            </div>
            <p
              class="text-sm font-bold text-gray-900 mt-2 border-b border-black inline-block px-2 min-w-25 text-center"
            >
              {{ form.pjNamaLengkap || "( Nama Jelas )" }}
            </p>
          </div>

          <div class="flex flex-col items-center">
            <p
              class="text-xs font-semibold text-gray-900 uppercase mb-2 text-center"
            >
              Pemberi Informasi / Petugas
            </p>
            <div class="w-full bg-gray-50 border border-gray-200 rounded">
              <BaseSignaturePad @update:signature="handleSignaturePasien" />
            </div>
            <p
              class="text-sm font-bold text-gray-900 mt-2 border-b border-black inline-block px-2 min-w-25 text-center"
            >
              {{ form.pjNamaLengkap || "( Nama Jelas )" }}
            </p>
          </div>
        </div>

        <div class="mt-8">
          <button
            type="submit"
            class="w-full rounded-md bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            Simpan Surat Pernyataan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
