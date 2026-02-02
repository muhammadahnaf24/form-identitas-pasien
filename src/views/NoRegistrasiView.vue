<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import BaseRoundedInput from "@/components/BaseRoundedInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserHeader from "@/components/UserHeader.vue";
import apiService from "@/services/apiService.js";
import { alertError, alertAutoClose, confirmAction } from "@/utils/swal";

const router = useRouter();
const noRegistrasi = ref("");
const isLoading = ref(false);
const namaUser = ref("Petugas RS");

onMounted(() => {
  const userData = localStorage.getItem("user_data");
  if (userData) {
    try {
      const parsed = JSON.parse(userData);

      namaUser.value = parsed.RealName || parsed.UserName || "Petugas RS";
    } catch (e) {
      console.error("Gagal membaca data user", e);
    }
  }
});

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
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50 font-sans flex flex-col">
    <div class="sticky top-0 z-50">
      <UserHeader :user-name="namaUser" />
    </div>

    <div class="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
      <div
        class="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10 transform transition-all hover:shadow-lg"
      >
        <div class="flex flex-col items-center mb-8">
          <img
            :src="logo"
            alt="Logo"
            class="h-32 drop-shadow-lg transition-transform hover:scale-105 duration-500 m-8"
          />
          <h2 class="text-3xl font-bold text-gray-900 tracking-tight">
            Masukkan No. Registrasi
          </h2>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-6 mt-8 text-center lg:text-left">
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
          </div>

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

        <div class="mt-8 border-t border-gray-100 pt-6 text-center">
          <p class="text-xs text-gray-400">
            © 2026 IT RS. Kristen Ngesti Waluyo
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
