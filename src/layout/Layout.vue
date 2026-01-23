<script setup>
import logo from "@/assets/logo.png";

defineProps({
  title: { type: String, default: "Selamat Datang" },
  subtitle: {
    type: String,
    default: "Silakan lengkapi data untuk melanjutkan.",
  },
  showBack: { type: Boolean, default: false },
});

defineEmits(["back"]);
</script>

<template>
  <div class="min-h-screen w-full flex bg-gray-50 font-sans overflow-x-hidden">
    <div
      class="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-center items-center bg-sky-600 relative overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-size[24px_24px]"
      ></div>
      <div
        class="absolute inset-0 bg-linear-to-br from-sky-600 to-blue-700 opacity-90"
      ></div>

      <div
        class="relative z-10 flex flex-col items-center text-white px-10 text-center"
      >
        <div
          class="bg-white/10 backdrop-blur-sm p-6 rounded-full mb-8 shadow-2xl border border-white/20"
        >
          <img
            :src="logo"
            alt="Logo"
            class="h-28 w-auto object-contain drop-shadow-md"
          />
        </div>

        <h1
          class="text-3xl xl:text-4xl font-extrabold tracking-tight mb-4 leading-tight"
        >
          RS. Kristen<br />Ngesti Waluyo
        </h1>
        <div class="h-1.5 w-16 bg-white/40 rounded-full mb-6"></div>
        <p
          class="text-lg text-blue-50/90 font-medium max-w-xs xl:max-w-md leading-relaxed"
        >
          Sistem Informasi Manajemen Rawat Inap & Pelayanan Pasien
        </p>
      </div>

      <p
        class="absolute bottom-8 text-xs text-blue-200/60 font-medium tracking-wide"
      >
        © 2026 IT Department RSKNW
      </p>
    </div>

    <div
      class="flex w-full lg:w-7/12 xl:w-1/2 items-center justify-center bg-white p-6 md:p-12 transition-all duration-500"
    >
      <div class="w-full max-w-md space-y-8">
        <div class="flex flex-col items-center lg:hidden mb-8">
          <img :src="logo" alt="Logo" class="h-20 mb-4 drop-shadow-sm" />
          <h2 class="text-xl font-bold text-gray-800 text-center">
            RS. Kristen Ngesti Waluyo
          </h2>
        </div>

        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
            {{ title }}
          </h2>
          <p class="mt-3 text-base text-gray-500 leading-relaxed">
            {{ subtitle }}
          </p>
        </div>

        <div class="mt-8">
          <slot></slot>
        </div>

        <div v-if="showBack" class="mt-6 text-center">
          <button
            type="button"
            @click="$emit('back')"
            class="text-sm font-medium text-gray-400 hover:text-[#008BFF] transition-colors flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-blue-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
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
            Kembali ke Menu Utama
          </button>
        </div>

        <p class="text-center text-xs text-gray-400 mt-12 lg:hidden">
          © 2026 IT Dept. RSKNW
        </p>
      </div>
    </div>
  </div>
</template>
