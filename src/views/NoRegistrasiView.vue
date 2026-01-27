<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import BaseRoundedInput from "@/components/BaseRoundedInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import apiService from "@/services/apiService.js";
import { alertError, alertAutoClose, confirmAction } from "@/utils/swal";

const router = useRouter();
const noRegistrasi = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  const regValue = noRegistrasi.value.trim();

  if (!regValue) {
    alertError("Validasi Gagal", "Nomor Registrasi wajib diisi.");
    return;
  }

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const response = await apiService.getPasien(regValue);

    if (response.data.success && response.data.data) {
      router.push({ name: "identitas", query: { reg: regValue } });
    } else {
      throw new Error("Data pasien tidak ditemukan di database.");
    }
  } catch (error) {
    console.error("Search Error:", error);

    if (error.response && error.response.status === 404) {
      alertError("Tidak Ditemukan", "Nomor registrasi tidak terdaftar.");
    } else {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Gagal menghubungi server.";
      alertError("Gagal Memuat", msg);
    }
  } finally {
    isLoading.value = false;
  }
};

const handleLogout = async () => {
  const isConfirmed = await confirmAction(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar dari aplikasi?",
    "Ya, Logout",
  );

  if (!isConfirmed) return;

  // Hapus Sesi
  localStorage.removeItem("token");
  localStorage.removeItem("user_data");

  // Notifikasi & Redirect
  await alertAutoClose(
    "Logout Berhasil",
    "Sampai jumpa kembali!",
    "success",
    1500,
  );
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
        <h1 class="text-4xl font-bold tracking-tight mb-4">
          Cek Identitas Pasien
        </h1>
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
      class="flex w-full items-center justify-center bg-white p-6 md:p-12 lg:w-7/12 relative"
    >
      <div class="absolute top-6 right-6 md:top-8 md:right-8">
        <BaseButton
          type="button"
          variant="white"
          @click="handleLogout"
          class="hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <template #icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
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
          </template>
          Logout
        </BaseButton>
      </div>

      <div class="w-full max-w-md space-y-8">
        <div class="flex flex-col items-center lg:hidden mb-8">
          <img :src="logo" alt="Logo" class="h-24 mb-4" />
        </div>

        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
            Masukkan No. Registrasi
          </h2>
          <p class="mt-2 text-sm text-gray-500">
            Silakan masukkan nomor registrasi pasien untuk melanjutkan.
          </p>
        </div>

        <form
          @submit.prevent="handleSubmit"
          class="space-y-6 mt-8 text-center lg:text-left"
        >
          <BaseRoundedInput
            v-model="noRegistrasi"
            type="text"
            placeholder="Contoh: 250121008"
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
            class="w-full"
          >
            CARI PASIEN
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </template>
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>
