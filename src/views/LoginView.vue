<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import logo from "@/assets/logo.png";
import apiService from "@/services/apiService.js";
import BaseRoundedInput from "@/components/BaseRoundedInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import { alertError, alertAutoClose } from "@/utils/swal";

const router = useRouter();

const form = reactive({ username: "", password: "", rememberMe: false });
const isLoading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  if (!form.username || !form.password) {
    alertError("Validasi Gagal", "Username dan Password wajib diisi.");
    return;
  }

  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const res = await apiService.login({
      username: form.username,
      password: form.password,
    });

    if (res.data.success) {
      const apiData = res.data.data || res.data;
      const userData = apiData.response?.user || apiData.user;
      const token = apiData.response?.token || apiData.token;

      if (token && userData) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_data", JSON.stringify(userData));

        await alertAutoClose(
          "Login Berhasil",
          `Selamat datang, ${userData.RealName || userData.UserName}!`,
          "success",
          1500,
        );

        router.push({ name: "noRegistrasi" });
      } else {
        throw new Error("Token atau Data User tidak ditemukan dalam response.");
      }
    } else {
      alertError(
        "Gagal Login",
        res.data.message || "Username atau password salah.",
      );
    }
  } catch (error) {
    console.error("Login Error:", error);

    const msg =
      error.response?.data?.message ||
      error.message ||
      "Gagal terhubung ke server.";
    alertError("Terjadi Kesalahan", msg);
  } finally {
    isLoading.value = false;
  }
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
          RS. Kristen Ngesti Waluyo
        </h1>
        <div class="h-1.5 w-20 bg-white/30 rounded-full mb-6"></div>
        <p
          class="text-white/80 text-lg font-medium leading-relaxed font-serif italic"
        >
          "Kasih Adalah Dasar Pelayanan Kami"
        </p>
      </div>
      <p class="absolute bottom-8 text-xs text-blue-200/60 tracking-wide">
        © 2026 IT RS. Kristen Ngesti Waluyo
      </p>
    </div>

    <div class="flex w-full items-center justify-center bg-white p-8 lg:w-7/12">
      <div class="w-full max-w-md space-y-8">
        <div class="flex flex-col items-center lg:hidden">
          <img :src="logo" alt="Logo" class="h-24 mb-4" />
        </div>

        <div class="text-center lg:text-left">
          <h2 class="text-3xl font-bold text-gray-900">Login Petugas</h2>
          <p class="mt-2 text-sm text-gray-500">
            Silakan masuk untuk mengakses halaman selanjutnya.
          </p>
        </div>

        <form
          @submit.prevent="handleLogin"
          class="space-y-6 mt-8 text-center lg:text-left"
        >
          <BaseRoundedInput
            v-model="form.username"
            placeholder="Username / NIK"
            required
          >
            <template #icon>
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </template>
          </BaseRoundedInput>

          <BaseRoundedInput
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Kata Sandi"
            required
          >
            <template #icon>
              <svg
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </template>

            <template #append>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  v-if="!showPassword"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.059 10.059 0 011.591-2.714M9.828 9.828a3 3 0 104.243 4.242M3 3l18 18"
                  />
                </svg>
              </button>
            </template>
          </BaseRoundedInput>

          <BaseButton
            type="submit"
            :loading="isLoading"
            loading-text="Sedang Masuk..."
            class="w-full"
          >
            MASUK
            <template #icon>
              <svg
                class="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </template>
          </BaseButton>
        </form>

        <p class="text-center text-xs text-gray-400 mt-8 lg:hidden">
          © 2026 IT Dept. RSKNW
        </p>
      </div>
    </div>
  </div>
</template>
