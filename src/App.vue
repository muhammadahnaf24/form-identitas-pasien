<script setup>
import { ref } from "vue";
import BaseSidebar from "@/components/BaseSidebar.vue";

const isSidebarOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen bg-gray-50/50">
    <BaseSidebar
      :is-sidebar-open="isSidebarOpen"
      @close-sidebar="isSidebarOpen = false"
    />

    <div class="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
      <div
        class="sticky top-0 z-10 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lbhjbhg:hidden"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="isSidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div
          class="flex-1 text-sm font-bold leading-6 text-blue-500 text-center"
        >
          RS. Kristen Ngesti Waluyo
        </div>
      </div>

      <main class="flex-1 overflow-y-auto p-4 sm:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>
