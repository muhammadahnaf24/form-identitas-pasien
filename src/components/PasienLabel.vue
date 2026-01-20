<script setup>
import { computed } from "vue";

const props = defineProps({
  pasienData: {
    type: Object,
    required: true,
    default: () => ({
      namaLengkap: "",
      jenisKelamin: "",
      tanggalLahir: "",
      umurTahun: "",
      umurBulan: "",
      noRm: "",
      nik: "",
    }),
  },
});

const inisial = computed(() => {
  if (props.pasienData.jenisKelamin === "Laki-laki") return "Tn";
  if (props.pasienData.jenisKelamin === "Perempuan") return "Ny";
  return " ";
});
</script>

<template>
  <div class="border-b border-gray-200 bg-white shadow-sm rounded-xl">
    <div class="max-w-5xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <div>
            <h3 class="text-sm font-bold text-gray-900 leading-tight">
              {{ pasienData.namaLengkap || "Nama Pasien " }} {{ inisial }}
            </h3>
          </div>
        </div>

        <div class="hidden sm:block text-right">
          <div
            class="inline-block border border-gray-300 rounded px-3 py-1.5 bg-gray-50 shadow-sm"
          >
            <table class="text-[12px] leading-tight text-left">
              <tbody>
                <tr>
                  <td class="font-semibold pr-3 text-gray-500">NIK</td>
                  <td class="font-mono font-bold text-gray-900">
                    : {{ pasienData.nik || "-" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold pr-3 text-gray-500">No RM</td>
                  <td class="font-mono font-bold text-gray-900">
                    : {{ pasienData.noRm || "-" }}
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold pr-3 text-gray-500">Tgl Lahir</td>
                  <td class="font-mono font-bold text-gray-900">
                    : {{ pasienData.tanggalLahir || "-" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
