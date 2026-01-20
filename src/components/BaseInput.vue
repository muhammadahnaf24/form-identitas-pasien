<script setup>
defineProps({
  label: { type: String, default: "" },
  modelValue: { type: [String, Number], default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  suffix: { type: String, default: "" },
  readonly: { type: Boolean, default: false },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium leading-6 mb-1"
      :class="readonly ? 'text-gray-300' : 'text-black'"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :readonly="readonly"
        class="block w-full rounded-md border-0 py-1.5 px-3 shadow-xs ring-1 ring-inset focus:ring-1 sm:text-sm sm:leading-6"
        :class="[
          readonly
            ? 'bg-blue-50 text-blue-700 font-semibold ring-gray-300 focus:ring-gray-300 cursor-not-allowed text-center'
            : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600',
        ]"
      />

      <span
        v-if="suffix"
        class="absolute right-3 top-2 text-xs text-gray-400 pointer-events-none"
      >
        {{ suffix }}
      </span>
    </div>
  </div>
</template>
