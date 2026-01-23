<script setup>
defineProps({
  type: {
    type: String,
    default: "submit",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
    default: "Memproses...",
  },
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="group relative flex w-full justify-center rounded-full bg-sky-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-600 hover:shadow-blue-500/50 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 active:scale-[0.98]"
  >
    <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {{ loadingText }}
    </span>

    <span v-else class="flex items-center gap-2">
      <slot>Kirim</slot>

      <slot name="icon"></slot>
    </span>
  </button>
</template>
