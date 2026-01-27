<script setup>
import { computed } from "vue";
import logoImage from "@/assets/logo.png";

const props = defineProps({
  data: {
    type: Object,
    required: false,
    default: () => ({}),
  },
});

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
  }).format(new Date());
});

const formatTanggalIndo = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch (e) {
    return dateString;
  }
};
</script>

<template>
  <div
    class="hidden print:block print:w-full print:h-auto font-serif text-black p-8 bg-white"
  >
    <div
      class="flex items-center justify-between border-b-4 border-double border-gray-800 pb-4 mb-6"
    >
      <div class="flex items-center gap-6">
        <img
          :src="logoImage"
          alt="Logo RS"
          class="h-24 w-auto object-contain grayscale"
        />
        <div>
          <h1 class="text-lg font-bold uppercase tracking-wide text-gray-900">
            RS. Kristen Ngesti Waluyo
          </h1>
        </div>
      </div>

      <div class="border-2 border-black p-2 min-w-70 text-xs font-sans">
        <div class="grid grid-cols-[70px_10px_1fr]">
          <span>Nama</span>
          <span class="text-center">:</span>
          <span class="uppercase wrap-break-words leading-tight">
            {{ data.namaLengkap || "................." }}
          </span>
        </div>

        <div class="grid grid-cols-[70px_10px_1fr]">
          <span>NIK</span>
          <span class="text-center">:</span>
          <span class="font-mono tracking-wide">{{
            data.nik || "................."
          }}</span>
        </div>

        <div class="grid grid-cols-[70px_10px_1fr]">
          <span>No. RM</span>
          <span class="text-center">:</span>
          <span>
            {{ data.noRm || "................." }}
          </span>
        </div>

        <div class="grid grid-cols-[70px_10px_1fr]">
          <span>Tgl Lahir</span>
          <span class="text-center">:</span>
          <span>{{
            formatTanggalIndo(data.tanggalLahir) || "................."
          }}</span>
        </div>
      </div>
    </div>

    <div class="text-center mb-4">
      <h2
        class="text-lg font-bold uppercase underline decoration-2 underline-offset-4"
      >
        Formulir Identitas Pasien
      </h2>
    </div>

    <div class="grid grid-cols-1 gap-y-1 text-xs leading-relaxed">
      <div class="flex">
        <div class="w-48 font-bold">No. Registrasi</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1 font-mono font-bold">{{ data.noReg }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Nama Lengkap</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1 uppercase">{{ data.namaLengkap }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Nama Panggilan</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.namaPanggilan || "-" }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Tempat / Tgl Lahir</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">
          {{ data.tempatLahir }}, {{ formatTanggalIndo(data.tanggalLahir) }}
        </div>
      </div>

      <div class="flex">
        <div class="w-48">Usia</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">
          <span v-if="data.umurTahun && data.umurTahun != 0">
            {{ data.umurTahun }} Tahun
          </span>

          <span
            v-if="
              data.umurTahun &&
              data.umurTahun != 0 &&
              data.umurBulan &&
              data.umurBulan != 0
            "
          >
            &nbsp;
          </span>

          <span v-if="data.umurBulan && data.umurBulan != 0">
            {{ data.umurBulan }} Bulan
          </span>

          <span
            v-if="
              (!data.umurTahun || data.umurTahun == 0) &&
              (!data.umurBulan || data.umurBulan == 0)
            "
          >
            -
          </span>
        </div>
      </div>

      <div class="flex">
        <div class="w-48">Jenis Kelamin</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.jenisKelamin }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Status Perkawinan</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.status }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Agama</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.agama }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Pendidikan Terakhir</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.pendidikan }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Pekerjaan</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.pekerjaan }}</div>
      </div>

      <div class="flex items-start">
        <div class="w-48 pt-0.5">Alamat Domisili</div>
        <div class="w-4 text-center pt-0.5">:</div>
        <div class="flex-1 leading-snug">
          <div>{{ data.alamat }},</div>

          <div class="mt-0.5 text-gray-800">
            <span v-if="data.desa">Kel. {{ data.desa }}, </span>
            <span v-if="data.kecamatan">Kec. {{ data.kecamatan }}, </span>
            <span v-if="data.kabupaten">{{ data.kabupaten }}</span>
            <span v-if="data.provinsi"> - {{ data.provinsi }}</span>
          </div>
        </div>
      </div>
      <div class="flex mt-1">
        <div class="w-48">No. Telepon / HP</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.noHp }}</div>
      </div>

      <div class="border-t border-dashed border-gray-400 my-4"></div>

      <h3 class="font-bold mb-2 uppercase text-gray-800">
        Data Penanggung Jawab / Kontak Darurat
      </h3>

      <div class="flex">
        <div class="w-48">Nama Lengkap</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.daruratNama }}</div>
      </div>

      <div class="flex">
        <div class="w-48">Hubungan Pasien</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">{{ data.hubungan }}</div>
      </div>

      <div class="flex items-start">
        <div class="w-48">Alamat</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">
          {{ data.daruratAlamat }}
          <span v-if="data.daruratDesa">, Desa {{ data.daruratDesa }}</span>
          <span v-if="data.daruratKecamatan"
            >, Kec. {{ data.daruratKecamatan }}</span
          >
          <span v-if="data.daruratKabupaten"
            >, {{ data.daruratKabupaten }}</span
          >
        </div>
      </div>

      <div class="flex">
        <div class="w-48">No. Telp / HP</div>
        <div class="w-4 text-center">:</div>
        <div class="flex-1">
          {{ data.daruratHp1 }}
          <span v-if="data.daruratHp2">/ {{ data.daruratHp2 }}</span>
        </div>
      </div>
    </div>

    <div
      class="mt-8 border border-gray-800 p-3 bg-gray-50 text-xs text-justify leading-snug italic"
    >
      <span class="font-bold not-italic mr-1">PERNYATAAN:</span>
      Saya yang bertanda tangan di bawah ini menyatakan bahwa data tersebut di
      atas adalah benar dan dapat dipertanggungjawabkan. Saya bersedia mengikuti
      segala peraturan dan tata tertib yang berlaku di RS. Kristen Ngesti Waluyo
      Parakan.
    </div>

    <div class="mt-8 flex justify-end">
      <div class="w-64 text-center">
        <p class="text-xs mb-1">
          Parakan, <span>{{ formattedDate }}</span>
        </p>
        <p class="text-xs font-bold mb-2">Yang Membuat Pernyataan,</p>

        <div
          class="h-24 w-full border-b border-black mb-2 flex items-end justify-center"
        >
          <img
            v-if="data.tandaTangan"
            :src="data.tandaTangan"
            alt="Tanda Tangan"
            class="h-20 w-auto object-contain mb-1"
          />
        </div>

        <p class="font-bold text-xs uppercase">
          ({{ data.daruratNama || "......................." }})
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 1cm;
  }

  body {
    font-family: "Times New Roman", Times, serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
