<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  options: {
    type: Array,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900 mb-2"
    >
      {{ label }}
    </label>

    <div class="flex flex-wrap gap-4">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex items-center gap-2 cursor-pointer"
      >
        <input
          type="radio"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
          class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
        />
        <span class="text-sm text-gray-700">{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>
