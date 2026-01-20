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
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "Pilih Salah Satu",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:label"]);

const handleChange = (event) => {
  const selectedId = event.target.value;
  emit("update:modelValue", selectedId);
};
</script>

<template>
  <div>
    <label
      v-if="label"
      class="block text-sm font-medium leading-6 text-gray-900 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="modelValue"
        @change="handleChange"
        :disabled="disabled"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-100 disabled:text-gray-400"
      >
        <option value="" disabled selected>{{ placeholder }}</option>

        <option v-for="item in options" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>
