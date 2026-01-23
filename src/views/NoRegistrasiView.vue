<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import BaseRoundedInput from "@/components/BaseRoundedInput.vue";
import BaseButton from "@/components/BaseButton.vue";

const router = useRouter();

const noRegistrasi = ref("");
const isLoading = ref(false);
const errorMessage = ref("");

const handleSubmit = () => {
  errorMessage.value = "";
  if (!noRegistrasi.value.trim()) {
    errorMessage.value = "Nomor Registrasi wajib diisi.";
    return;
  }
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    router.push({ name: "identitas", query: { reg: noRegistrasi.value } });
  }, 500);
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user_data");

  router.push({ name: "login" });
};
</script>

<template>
  <div class="flex min-h-screen w-full bg-gray-50 font-sans">
    <div
      class="hidden w-5/12 flex-col justify-center items-center bg-sky-600 relative lg:flex"
    >
      <div
        class="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-size[20px_20px]"
      ></div>
      <div
        class="absolute inset-0 bg-linear-to-br from-sky-600 to-blue-700 opacity-90"
      ></div>

      <div
        class="relative z-10 flex flex-col items-center text-white px-10 text-center"
      >
        <div
          class="bg-white p-6 rounded-full h-48 w-48 text-center flex items-center justify-center mb-6"
        >
          <img
            :src="logo"
            alt="Logo"
            class="h-32 drop-shadow-lg transition-transform hover:scale-105 duration-500"
          />
        </div>
        <h1 class="text-4xl font-bold tracking-tight mb-4">Cek Pendaftaran</h1>
        <div class="h-1.5 w-20 bg-white/30 rounded-full mb-6"></div>
        <p
          class="text-white/80 text-lg font-medium leading-relaxed font-serif italic"
        >
          Masukkan nomor registrasi pasien.
        </p>
      </div>
      <p class="absolute bottom-8 text-xs text-blue-200/60 tracking-wide">
        © 2026 IT RS. Kristen Ngesti Waluyo
      </p>
    </div>

    <div
      class="flex w-full items-center justify-center bg-white p-6 md:p-12 lg:w-7/12"
    >
      <div class="absolute top-6 right-6 md:top-8 md:right-8">
        <button
          type="button"
          @click="handleLogout"
          class="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-red-600 border-transparent rounded-full hover:bg-red-200 hover:text-red-600 hover:border-red-600 active:scale-95 border-2"
          title="Keluar dari akun"
        >
          <span class="hidden sm:inline">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
      <div class="w-full max-w-md space-y-8">
        <div class="flex flex-col items-center lg:hidden mb-8">
          <img :src="logo" alt="Logo" class="h-24 mb-4" />
        </div>

        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
            Masukkan Nomor Registrasi
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            Silakan masukkan nomor registrasi pasien
          </p>
        </div>

        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="transform opacity-0 -translate-y-2"
          enter-to-class="transform opacity-100 translate-y-0"
        >
          <div
            v-if="errorMessage"
            class="flex items-center gap-3 rounded-xl border-l-4 border-red-500 bg-red-50 p-4 text-red-700 shadow-sm"
          >
            <svg
              class="h-5 w-5 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-sm font-medium">{{ errorMessage }}</span>
          </div>
        </transition>

        <form @submit.prevent="handleSubmit" class="space-y-6 mt-8">
          <BaseRoundedInput
            v-model="noRegistrasi"
            type="text"
            placeholder="00000000"
            required
            class="text-lg tracking-wide font-medium"
          >
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
                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884-.5 2-2 2h4c-1.5 0-2-1.116-2-2z"
                />
              </svg>
            </template>
          </BaseRoundedInput>

          <BaseButton
            type="submit"
            :loading="isLoading"
            loading-text="Mengecek Data..."
            class="shadow-xl shadow-sky-500/20"
          >
            LANJUTKAN
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </template>
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
