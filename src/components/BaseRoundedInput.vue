<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  required: { type: Boolean, default: false },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative group">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 group-focus-within:text-sky-600 transition-colors"
    >
      <slot name="icon"></slot>
    </div>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      class="block w-full rounded-full border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600/20"
      v-bind="$attrs"
    />

    <div
      v-if="$slots.append"
      class="absolute inset-y-0 right-0 flex items-center pr-4"
    >
      <slot name="append"></slot>
    </div>
  </div>
</template>
