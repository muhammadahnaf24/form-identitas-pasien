<script setup>
import { computed } from "vue";

const props = defineProps({
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
  variant: {
    type: String,
    default: "sky",
    validator(value) {
      return ["sky", "emerald", "white", "danger"].includes(value);
    },
  },
  rounded: {
    type: String,
    default: "rounded-xl",
  },
});

const baseClass =
  "group relative inline-flex items-center justify-center gap-2 border px-6 py-4 text-base font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 disabled:hover:translate-y-0 active:scale-[0.98]";

const variantClasses = {
  sky: "bg-sky-600 border-transparent text-white shadow-lg shadow-sky-200 hover:bg-sky-700 focus:ring-sky-500",
  emerald:
    "bg-emerald-600 border-transparent text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 focus:ring-emerald-500",
  white:
    "bg-white border-gray-300 text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-200",
  danger:
    "bg-red-600 border-transparent text-white shadow-lg shadow-red-200 hover:bg-red-700 focus:ring-red-500",
};

const buttonClasses = computed(() => {
  return [baseClass, variantClasses[props.variant], props.rounded].join(" ");
});
</script>

<template>
  <button :type="type" :disabled="disabled || loading" :class="buttonClasses">
    <span v-if="loading" class="flex items-center gap-2">
      <svg
        class="h-5 w-5 animate-spin"
        :class="variant === 'white' ? 'text-gray-500' : 'text-white'"
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

      <slot name="icon"> </slot>
    </span>
  </button>
</template>
