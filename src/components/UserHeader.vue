<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { confirmAction, alertAutoClose } from "@/utils/swal";
import logo from "@/assets/logo.png";

const props = defineProps({
  userName: {
    type: String,
    default: "Admin User",
  },
});

const router = useRouter();
const isOpen = ref(false);
const dropdownRef = ref(null);

const userInitials = computed(() => {
  const name = (props.userName || "").toString();
  const parts = name.trim().split(/\s+/);

  if (parts.length === 0 || parts[0] === "") return "U";

  const firstChar = parts[0].charAt(0);
  const secondChar = parts[1] ? parts[1].charAt(0) : "";
  const thirdChar = parts[2] ? parts[2].charAt(0) : "";

  return (firstChar + secondChar + thirdChar).toUpperCase();
});
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeOnClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

const handleLogout = async () => {
  isOpen.value = false;

  const isConfirmed = await confirmAction(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar dari aplikasi?",
    "Ya, Logout",
  );

  if (!isConfirmed) return;

  localStorage.removeItem("token");
  localStorage.removeItem("user_data");

  await alertAutoClose(
    "Logout Berhasil",
    "Sampai jumpa kembali!",
    "success",
    1500,
  );
  router.push({ name: "login" });
};

onMounted(() => {
  document.addEventListener("click", closeOnClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", closeOnClickOutside);
});
</script>

<template>
  <header
    class="bg-white text-sky-700 shadow-md relative z-50 w-full shadow-white-200"
  >
    <div
      class="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center"
    >
      <div class="flex items-center gap-3 md:gap-4">
        <img :src="logo" alt="Logo" class="h-10 w-auto drop-shadow-md" />

        <div class="flex flex-col">
          <span class="font-bold text-md leading-tight tracking-wide">
            RS Kristen Ngesti Waluyo
          </span>
        </div>
      </div>

      <div class="relative" ref="dropdownRef">
        <button
          @click="toggleDropdown"
          class="flex items-center gap-3 focus:outline-none group p-1 pr-2 rounded-full transition-all duration-200"
        >
          <div
            class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-transparent group-hover:border-blue-200 transition-all"
          >
            <span class="font-bold text-sm tracking-tight">{{
              userInitials
            }}</span>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-sky-600 group-hover:text-sky-300 transition-transform duration-200 hidden sm:block"
            :class="{ 'rotate-180': isOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <transition
          enter-active-class="transition ease-out duration-150"
          enter-from-class="transform opacity-0 scale-95 -translate-y-2"
          enter-to-class="transform opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-100"
          leave-from-class="transform opacity-100 scale-100 translate-y-0"
          leave-to-class="transform opacity-0 scale-95 -translate-y-2"
        >
          <div
            v-if="isOpen"
            class="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 text-gray-700 origin-top-right z-50 overflow-hidden"
          >
            <div class="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
              <p class="text-sm font- text-gray-900 truncate mt-0.5">
                {{ userName }}
              </p>
            </div>

            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors group"
            >
              <div
                class="p-1.5 bg-red-100 rounded-md group-hover:bg-red-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <span class="font-medium">Keluar Aplikasi</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
