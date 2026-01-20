<script setup>
import logoImage from "@/assets/logo.png";
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const inisial = computed(() => {
  if (props.data.jenisKelamin === "Laki-laki") return "Tn";
  if (props.data.jenisKelamin === "Perempuan") return "Ny";
  return " ";
});
</script>

<template>
  <div
    class="hidden print:block print:fixed print:inset-0 print:z-9999 print:bg-white print:w-full print:h-auto print:overflow-visible text-black font-serif p-8"
    style="font-family: 'Times New Roman', Times, serif"
  >
    <div
      class="flex justify-between items-start mb-8 pb-4 border-b-2 border-black"
    >
      <div class="flex items-center gap-4 flex-1">
        <img :src="logoImage" alt="Logo" class="h-20 w-auto grayscale" />
        <div>
          <h1 class="text-xl font-bold uppercase tracking-widest">
            RSK Ngesti Waluyo
          </h1>
          <p class="text-sm">Jl. Pahlawan No. 1, Parakan, Temanggung</p>
          <p class="text-xs">
            Telp: (0293) 123456 | Email: info@rskngestiwaluyo.com
          </p>
        </div>
      </div>

      <div class="w-80 border-2 border-black p-2 ml-4 capitalize">
        <table class="w-full text-xs font-bold leading-tight">
          <tbody>
            <tr>
              <td class="w-20 align-top">Nama</td>
              <td class="w-2 align-top">:</td>
              <td class="font-mono">{{ data.namaLengkap }} {{ inisial }}</td>
            </tr>
            <tr>
              <td class="align-top">NIK</td>
              <td class="align-top">:</td>
              <td class="font-mono">{{ data.nik }}</td>
            </tr>
            <tr>
              <td class="align-top">No. RM</td>
              <td class="align-top">:</td>
              <td class="font-mono text-sm">{{ data.noRm || "........" }}</td>
            </tr>
            <tr>
              <td class="align-top">Tgl Lahir</td>
              <td class="align-top">:</td>
              <td>{{ data.tanggalLahir }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center mb-6">
      <h2
        class="text-lg font-bold underline decoration-2 underline-offset-4 uppercase"
      >
        Formulir Identitas Pasien
      </h2>
    </div>

    <div class="space-y-1.5 text-sm leading-relaxed capitalize">
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Nama Lengkap</div>
        <div>:</div>
        <div class="uppercase font-bold">{{ data.namaLengkap }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>NIK</div>
        <div>:</div>
        <div class="font-mono">{{ data.nik }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Tempat, Tanggal Lahir</div>
        <div>:</div>
        <div>{{ data.tempatLahir }}, {{ data.tanggalLahir }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Jenis Kelamin</div>
        <div>:</div>
        <div>{{ data.jenisKelamin }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Status Pernikahan</div>
        <div>:</div>
        <div>{{ data.status }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Agama</div>
        <div>:</div>
        <div>{{ data.agama }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Pendidikan</div>
        <div>:</div>
        <div>{{ data.pendidikan }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Pekerjaan</div>
        <div>:</div>
        <div>{{ data.pekerjaan }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Alamat Domisili</div>
        <div>:</div>
        <div>
          {{ data.alamat }}, RT {{ data.rt }} / RW {{ data.rw }} Desa
          {{ data.desa }}, Kec. {{ data.kecamatan }},
          {{ data.kabupaten }}
        </div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>No. HP</div>
        <div>:</div>
        <div>{{ data.noHp }}</div>
      </div>

      <div class="pt-4 pb-2">
        <h3 class="font-bold border-b border-gray-400 w-full inline-block">
          Kontak Darurat
        </h3>
      </div>

      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Nama Penanggung Jawab</div>
        <div>:</div>
        <div>{{ data.daruratNama }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Hubungan dengan Pasien</div>
        <div>:</div>
        <div>{{ data.hubungan }}</div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>Alamat</div>
        <div>:</div>
        <div>
          {{ data.daruratAlamat }}, RT {{ data.daruratRt }} / RW
          {{ data.daruratRw }} Desa {{ data.daruratDesa }},
          {{ data.daruratKecamatan }},
          {{ data.daruratKabupaten }}
        </div>
      </div>
      <div class="grid grid-cols-[200px_10px_1fr]">
        <div>No. HP Darurat</div>
        <div>:</div>
        <div>{{ data.daruratHp1 }} / {{ data.daruratHp2 }}</div>
      </div>
    </div>

    <div class="mt-12 flex justify-end">
      <div class="text-center w-64">
        <p class="mb-4">
          Parakan,
          {{ new Date().toLocaleDateString("id-ID", { dateStyle: "long" }) }}
        </p>
        <p class="font-bold text-xs mb-2">Yang Menyatakan,</p>

        <div
          class="h-24 w-full flex items-center justify-center border-b border-black mb-2"
        >
          <img
            v-if="data.tandaTangan"
            :src="data.tandaTangan"
            class="h-full w-auto object-contain"
          />
        </div>

        <p class="font-bold uppercase text-sm">
          ({{ data.namaLengkap || "......................." }})
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  body {
    font-family: "Times New Roman", serif;
  }
  /* Memastikan background border tercetak */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
</style>
