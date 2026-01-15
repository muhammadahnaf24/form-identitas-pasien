<script setup>
import { ref, onMounted } from "vue";

const canvasRef = ref(null);
const isDrawing = ref(false);
const ctx = ref(null);

const emit = defineEmits(["update:signature"]);

onMounted(() => {
  const canvas = canvasRef.value;
  ctx.value = canvas.getContext("2d");

  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  ctx.value.scale(2, 2);

  ctx.value.strokeStyle = "#000";
  ctx.value.lineWidth = 2;
  ctx.value.lineCap = "round";
});

const startDrawing = (e) => {
  isDrawing.value = true;
  draw(e);
};

const stopDrawing = () => {
  isDrawing.value = false;
  ctx.value.beginPath();
  saveSignature();
};

const draw = (e) => {
  if (!isDrawing.value) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  const rect = canvasRef.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  ctx.value.lineTo(x, y);
  ctx.value.stroke();
  ctx.value.beginPath();
  ctx.value.moveTo(x, y);
};

const saveSignature = () => {
  const dataUrl = canvasRef.value.toDataURL("image/png");
  emit("update:signature", dataUrl);
};

const clearCanvas = () => {
  const canvas = canvasRef.value;
  ctx.value.clearRect(0, 0, canvas.width, canvas.height);
  emit("update:signature", "");
};

defineExpose({ clearCanvas });
</script>

<template>
  <div
    class="border-2 border-dashed border-gray-400 rounded-xl bg-gray-50 relative overflow-hidden touch-none"
  >
    <canvas
      ref="canvasRef"
      class="w-full h-50 cursor-crosshair block"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.prevent="startDrawing"
      @touchmove.prevent="draw"
      @touchend.prevent="stopDrawing"
    ></canvas>

    <div class="absolute bottom-2 right-2">
      <button
        type="button"
        @click="clearCanvas"
        class="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
      >
        Hapus Tanda Tangan
      </button>
    </div>

    <div class="absolute top-2 left-2 pointer-events-none opacity-40">
      <span class="text-xs text-gray-500">Area Tanda Tangan (Touch/Mouse)</span>
    </div>
  </div>
</template>

<style scoped>
.touch-none {
  touch-action: none;
}
</style>
